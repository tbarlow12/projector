import { ConfigValue, NumberConstants } from "../../../constants";
import { BacklogServiceFactory } from "../../../factories";
import { registerProviders } from "../../../initialization/registerProviders";
import { BacklogItemType, Sprint } from "../../../models";
import { Config } from "../../../utils";
import { BacklogServiceProvider } from "../backlogServiceProvider";
import { AzureDevOpsProviderOptions } from "./azureDevOpsBacklogService";
import { random } from "@supercharge/strings"

describe("Azure DevOps Backlog Service", () => {
  registerProviders();

  const providerOptions: AzureDevOpsProviderOptions = {
    baseUrl: Config.getValue(ConfigValue.TestAzDOBaseUrl),
    personalAccessToken: Config.getValue(ConfigValue.TestAzDOAccessToken),
    projectName: Config.getValue(ConfigValue.TestAzDOProjectName),
  };

  const service = BacklogServiceFactory.get({
    providerName: BacklogServiceProvider.AzureDevOps,
    providerOptions,
  });

  fit("can create sprints", async () => {
    const start = new Date();
    start.setFullYear(2021);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + NumberConstants.millisecondsInADay * 7);
    const initialSprints: Sprint[] = [1, 2, 3].map((num: number) => {
      return {
        name: `Sprint ${num} ${random(10)}`,
        startDate: start,
        finishDate: end,
      }   
    });

    const sprints = await service.createSprints(initialSprints);

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
      const fetchedSprint = await service.getSprint(id);
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
  
  it("can create an epic", async () => {
    await service.createBacklogItems([{
      name: "My Epic",
      type: BacklogItemType.Epic,
    }]);
  });

  it("can create a feature", () => {
    throw new Error("not implemented");
  });

  it("can create a story", () => {
    throw new Error("not implemented");
  });

  it("can create a task", () => {
    throw new Error("not implemented");
  });

  it("can create a bug", () => {
    throw new Error("not implemented");
  });
});
