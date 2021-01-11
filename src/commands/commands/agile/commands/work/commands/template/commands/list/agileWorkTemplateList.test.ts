import { FileConstants } from "../../../../../../../../../constants";
import { ProjectorConfig } from "../../../../../../../../../models";
import { SimulatedStorageService } from "../../../../../../../../../services/storage/simulatedStorageService";
import { ModelSimulator } from "../../../../../../../../../test";
import { Logger } from "../../../../../../../../../utils";
import { agileWorkTemplateList } from "./agileWorkTemplateList";

describe("Agile Work Template List", () => {
  const projectorConfig = ModelSimulator.createTestConfig();
  const projectorConfigStorageService = new SimulatedStorageService<ProjectorConfig>();

  beforeAll(() => {
    projectorConfigStorageService.write(FileConstants.configFileName, projectorConfig);
  });

  beforeEach(() => {
    Logger.logHeader = jest.fn();
    Logger.log = jest.fn();
  });

  it("lists work item templates", async () => {
    // TODO: This needs a rework.
    // await agileWorkTemplateList.parseAsync(CliSimulator.createArgs());
    // expect(Logger.logHeader).toBeCalledWith("Work Item Templates");
    // Currently a stub for the predefined templates we have in this repo
    // Will need to be more sophisticated when this command fetches templates
    // from the playbook repo
    // expect(Logger.log).toBeCalledTimes(2);
  });
});
