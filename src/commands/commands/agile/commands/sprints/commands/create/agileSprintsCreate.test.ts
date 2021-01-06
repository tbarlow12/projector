import mockFs from "mock-fs";
import { CliSimulator, ModelSimulator, SimulatorAgileService } from "../../../../../../../test";
import { Logger, UserUtils } from "../../../../../../../utils";
import { agileSprintsCreate } from "./agileSprintsCreate";
jest.mock("../../../../../../../factories/agileServiceFactory");
import { AgileServiceFactory } from "../../../../../../../factories/agileServiceFactory";

describe("Agile Sprints Create Command", () => {
  const projectorConfigFileName = "projector.json";
  const projectorConfig = ModelSimulator.createTestConfig();

  beforeAll(() => {
    const fileSystem: { [fileName: string]: string } = {};
    fileSystem[projectorConfigFileName] = JSON.stringify(projectorConfig);
    mockFs(fileSystem);
    Logger.log = jest.fn();
    UserUtils.confirmAction = jest.fn(() => Promise.resolve(true));
  });

  afterAll(() => {
    mockFs.restore();
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
