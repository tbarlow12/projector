import { ConfigValue, NumberConstants } from "../../../constants";
import { BacklogServiceFactory } from "../../../factories";
import { registerProviders } from "../../../initialization/registerProviders";
import { BacklogItemType } from "../../../models";
import { Config } from "../../../utils";
import { BacklogServiceProvider } from "../backlogServiceProvider";
import { AzureDevOpsProviderOptions } from "./azureDevOpsBacklogService";

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
    sprints: {
      lengthOfSprintInDays: 7,
      numberOfSprints: 10,
      startDate: "2020-12-25"
    }
  });

  it("can create sprints", async () => {
    const now = new Date();
    const end = new Date(now.getTime() + NumberConstants.millisecondsInADay * 7);
    await service.createSprints([{
      name: "Sprint 1",
      startDate: now,
      finishDate: end,
    }]);
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
