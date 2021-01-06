import { CliSimulator, ModelSimulator } from "../../../../../../../../../test";
import mockFs from "mock-fs";
import { FileUtils, Logger } from "../../../../../../../../../utils";
import { agileWorkTemplateInit } from "./agileWorkTemplateInit";
import { FileConstants } from "../../../../../../../../../constants";

describe("Agile Work Template List", () => {
  const projectorConfigFileName = "projector.json";
  const projectorConfig = ModelSimulator.createTestConfig();

  beforeAll(() => {
    const fileSystem: { [fileName: string]: string } = {};
    fileSystem[projectorConfigFileName] = JSON.stringify(projectorConfig);
    mockFs(fileSystem, { createCwd: true });
  });

  beforeEach(() => {
    Logger.logHeader = jest.fn();
    Logger.log = jest.fn();
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("writes template to default or specified output file", async () => {
    const writeFile = jest.spyOn(FileUtils, "writeFile");

    await agileWorkTemplateInit.parseAsync(
      CliSimulator.createArgs([
        {
          name: "--template",
          value: "empty",
        },
      ]),
    );

    expect(writeFile).toBeCalledWith(FileConstants.backlogItemsFileName, expect.any(String));
    writeFile.mockReset();

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
    expect(writeFile).toBeCalledWith(outputFileName, expect.any(String));
    writeFile.mockReset();
  });
});
