import { random } from "@supercharge/strings";
import { ConfigValue, NumberConstants } from "../../../../constants";
import { registerProviders } from "../../../../initialization/registerProviders";
import { BacklogItem, BacklogItemType, Sprint } from "../../../../models";
import { Config, Logger, retryAsync, UserUtils } from "../../../../utils";
import { AgileServiceProvider } from "../../agileServiceProvider";
import { AzureDevOpsAgileService, AzureDevOpsProviderOptions } from "./azureDevOpsAgileService";

xdescribe("Azure DevOps Backlog Service", () => {
  registerProviders();

  beforeEach(() => {
    UserUtils.confirmAction = jest.fn(() => Promise.resolve(true));
    Logger.log = jest.fn();
  });

  const providerOptions: AzureDevOpsProviderOptions = {
    baseUrl: Config.getValue(ConfigValue.AzDOBaseUrl),
    personalAccessToken: Config.getValue(ConfigValue.AzDOAccessToken),
    projectName: Config.getValue(ConfigValue.AzDOProjectName),
  };

  const service = new AzureDevOpsAgileService({
    providerName: AgileServiceProvider.AzureDevOps,
    providerOptions,
  });

  it("can create, get and delete sprints", async () => {
    const start = new Date();
    start.setFullYear(2021);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + NumberConstants.millisecondsInADay * 7);
    const initialSprints: Sprint[] = [1, 2, 3].map((num: number) => {
      return {
        name: `Sprint ${num} ${random(10)}`,
        startDate: start,
        finishDate: end,
      };
    });

    const sprints = await service.createSprints(initialSprints);

    expect(UserUtils.confirmAction).toBeCalled();

    expect(sprints).toHaveLength(initialSprints.length);

    for (const sprint of sprints) {
      const { id, name, startDate, finishDate } = sprint;

      expect(id).toBeDefined();
      expect(name).toBeDefined();
      expect(startDate).toBeDefined();
      expect(finishDate).toBeDefined();

      if (!id) {
        throw new Error("ID should be defined");
      }

      // Get created sprint
      const fetchedSprint = await retryAsync(() => service.getSprint(id), 10, 2);
      expect(fetchedSprint.name).toEqual(name);
      expect(fetchedSprint.id).toEqual(id);
      expect(fetchedSprint.startDate).toEqual(startDate);
      expect(fetchedSprint.finishDate).toEqual(finishDate);

      // Clean up test sprint
      await service.deleteSprint(id);

      // Sprint ID should not exist anymore
      await expect(service.getSprint(id)).rejects.toThrow();
    }
  }, 60000);

  it("can create, get and delete hierarchical work items", async () => {
    const initialBacklogItem: BacklogItem = {
      name: "My Sample Story with Tasks",
      type: BacklogItemType.Story,
      description: "This is my sample story",
      acceptanceCriteria: ["This should work", "This whould work well"],
      children: [
        {
          name: "My Task",
          type: BacklogItemType.Task,
        },
      ],
    };

    const createdBacklogItems = await service.createBacklogItems([initialBacklogItem]);

    expect(createdBacklogItems).toHaveLength(1);

    const createdBacklogItem = createdBacklogItems[0];
    expect(createdBacklogItem).toEqual({
      ...initialBacklogItem,
      id: expect.any(String),
      url: expect.any(String),
      description: expect.stringMatching(new RegExp(`.*${initialBacklogItem.description}.*`)),
      acceptanceCriteria: expect.stringMatching(
        new RegExp(`.*${initialBacklogItem.acceptanceCriteria![0]}.*${initialBacklogItem.acceptanceCriteria![1]}.*`),
      ),
      children: [
        {
          ...initialBacklogItem.children![0],
          id: expect.any(String),
          url: expect.any(String),
        },
      ],
    });

    // Retrieve backlog item with same ID
    const retrievedBacklogItems = await service.getBacklogItems([createdBacklogItem.id!]);

    // Should be the same as the created backlog item
    expect(retrievedBacklogItems).toEqual(createdBacklogItems);

    // Clean up created backlog item
    await service.deleteBacklogItems([createdBacklogItem.id!]);

    // Backlog item should no longer exist
    await expect(service.getBacklogItems([createdBacklogItem.id!])).rejects.toThrow();
  }, 60000);
});
