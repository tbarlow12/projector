import { random } from "@supercharge/strings";
import { ConfigValue, NumberConstants } from "../../../../constants";
import { AgileServiceFactory } from "../../../../factories";
import { registerProviders } from "../../../../initialization/registerProviders";
import { BacklogItem, BacklogItemType, Sprint } from "../../../../models";
import { Config, retryAsync, UserUtils } from "../../../../utils";
import { AgileServiceProvider } from "../../agileServiceProvider";
import { AzureDevOpsProviderOptions } from "./azureDevOpsAgileService";

describe("Azure DevOps Agile Service", () => {
  registerProviders();

  const originalLogFunction = console.log;

  beforeEach(() => {
    UserUtils.confirmAction = jest.fn(() => Promise.resolve(true));
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalLogFunction;
  });

  const providerOptions: AzureDevOpsProviderOptions = {
    baseUrl: Config.getValue(ConfigValue.AzDOBaseUrl),
    personalAccessToken: Config.getValue(ConfigValue.AzDOAccessToken),
    projectName: Config.getValue(ConfigValue.AzDOProjectName),
  };

  const service = AgileServiceFactory.get({
    providerName: AgileServiceProvider.AzureDevOps,
    providerOptions,
  });

  it("can create, retrieve and delete sprints", async () => {
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

  it("can create, retrieve and delete work items", async () => {
    const originalBacklogItems: BacklogItem[] = [
      {
        name: "My Sample Story with Tasks",
        type: BacklogItemType.Story,
        description: "This is my sample story",
        acceptanceCriteria: [
          "This should work",
          "This whould work well",
        ],
        children: [
          {
            name: "My Task 1",
            type: BacklogItemType.Task,
          },
          {
            name: "My Task 2",
            type: BacklogItemType.Task,
          }
        ]
      }
    ];

    const createdBacklogItems = await service.createBacklogItems(originalBacklogItems);

    const originalBacklogItem = originalBacklogItems[0];
    const originalAC = originalBacklogItem.acceptanceCriteria as string[];

    expect(createdBacklogItems).toEqual([
      {
        ...originalBacklogItem,
        id: expect.any(String),
        children: originalBacklogItem.children!.map((originalChild: BacklogItem) => {
          return {
            ...originalChild,
            id: expect.any(String),
            url: expect.any(String),
          };
        }),
        acceptanceCriteria: expect.stringMatching(
          new RegExp(`.*${originalAC[0]}.*${originalAC[1]}.*`)),
        url: expect.any(String),
      }
    ]);

    expect(createdBacklogItems).toHaveLength(1);

    const createdItem = createdBacklogItems[0];

    expect(createdItem.id).toBeDefined();
    expect(createdItem.children).toBeDefined();
    expect(createdItem.children).toHaveLength(2);

    createdItem.children!.forEach((child: BacklogItem) => {
      expect(child.id).toBeDefined();
    });

    const retrievedBacklogItems = await service.getBacklogItems([createdItem.id!], true);

    expect(normalizeBacklogItems(retrievedBacklogItems)).toEqual(normalizeBacklogItems(createdBacklogItems));

    await service.deleteBacklogItems([createdItem.id!], true);
    await expect(service.getBacklogItems([createdItem.id!])).rejects.toThrow();
  }, 60000);
});

function normalizeBacklogItems(items: BacklogItem[]): BacklogItem[] {
  return items.map(item => normalizeBacklogItem(item));
}

function normalizeBacklogItem(item: BacklogItem): BacklogItem {
  if (item.children) {
    item.children = normalizeBacklogItems(item.children)
      .sort((a, b) => +a.id! > +b.id! ? 1 : -1)
  }
  return item;
}
