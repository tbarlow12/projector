import { random } from "@supercharge/strings";
import { ConfigValue, NumberConstants } from "../../../constants";
import { AgileServiceFactory } from "../../../factories";
import { registerProviders } from "../../../initialization/registerProviders";
import { BacklogItemType, Sprint } from "../../../models";
import { Config, retryAsync, UserUtils } from "../../../utils";
import { AgileServiceProvider } from "../agileServiceProvider";
import { AzureDevOpsProviderOptions } from "./azureDevOpsAgileService";

describe("Azure DevOps Backlog Service", () => {
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

  it("can create sprints", async () => {
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
});
