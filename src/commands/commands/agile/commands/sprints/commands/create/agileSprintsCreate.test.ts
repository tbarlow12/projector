import { CliSimulator, ModelSimulator, SimulatorAgileService } from "../../../../../../../test";
import { Logger, UserUtils } from "../../../../../../../utils";
import { agileSprintsCreate } from "./agileSprintsCreate";
jest.mock("../../../../../../../factories/agileServiceFactory");
import { AgileServiceFactory } from "../../../../../../../factories/agileServiceFactory";
import { SimulatedStorageService } from "../../../../../../../services/storage/simulatedStorageService";
import { FileConstants } from "../../../../../../../constants";

describe("Agile Sprints Create Command", () => {
  const projectorConfig = ModelSimulator.createTestConfig();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storageService = new SimulatedStorageService<any>();

  beforeAll(async () => {
    await storageService.write(FileConstants.configFileName, projectorConfig);
    Logger.log = jest.fn();
    UserUtils.confirmAction = jest.fn(() => Promise.resolve(true));
  });

  it("creates sprints", async () => {
    const createSprints = jest.fn();
    AgileServiceFactory.get = jest.fn(
      () =>
        new SimulatorAgileService({
          createProviderSprints: createSprints,
        }),
    );

    await agileSprintsCreate.parseAsync(CliSimulator.createArgs());
    expect(createSprints).toBeCalled();
  });
});
