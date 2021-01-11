import { StorageServiceFactory } from "../../../../../../../../../factories/storageServiceFactory";
import { SimulatedStorageService } from "../../../../../../../../../services/storage/simulatedStorageService";
import { CliSimulator, ModelSimulator } from "../../../../../../../../../test";
import { Logger } from "../../../../../../../../../utils";
import { agileWorkTemplateInit } from "./agileWorkTemplateInit";

describe("Agile Work Template List", () => {
  const projectorConfigFileName = "projector.json";
  const projectorConfig = ModelSimulator.createTestConfig();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storageSimulator = new SimulatedStorageService<any>();
  const writeSpy = jest.spyOn(storageSimulator, "write");

  beforeAll(async () => {
    await storageSimulator.write(projectorConfigFileName, projectorConfig);
    StorageServiceFactory.get = jest.fn(() => storageSimulator);
  });

  beforeEach(() => {
    Logger.logHeader = jest.fn();
    Logger.log = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("writes template to the default output file", async () => {
    await agileWorkTemplateInit.parseAsync(
      CliSimulator.createArgs([
        {
          name: "--template",
          value: "empty",
        },
      ]),
    );

    expect(writeSpy).toBeCalled();
  });

  it("writes a template to a provided output file", async () => {
    // expect().toBeCalledWith(FileConstants.backlogItemsFileName, expect.any(String));
    const outputFileName = "out.json";

    // Running both tests within this block to run executions sequentially
    // Jest does not have a good way to run specific tests in sequence, and
    // these tests will directly conflict with each other if run in parallel

    await agileWorkTemplateInit.parseAsync(
      CliSimulator.createArgs([
        {
          name: "--template",
          value: "empty",
        },
        {
          name: "--out-file",
          value: outputFileName,
        },
      ]),
    );

    expect(writeSpy).toBeCalled();
  });
});
