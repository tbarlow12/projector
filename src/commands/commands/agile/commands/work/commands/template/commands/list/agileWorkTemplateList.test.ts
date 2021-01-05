import { CliSimulator, ModelSimulator } from "../../../../../../../../../test";
import mockFs from "mock-fs";
import { Logger } from "../../../../../../../../../utils";
import { agileWorkTemplateList } from "./agileWorkTemplateList";

describe("Agile Work Template List", () => {
  const cseConfigFileName = "cse.json";
  const cseConfig = ModelSimulator.createTestConfig();

  beforeAll(() => {
    const fileSystem: { [fileName: string]: string } = {};
    fileSystem[cseConfigFileName] = JSON.stringify(cseConfig);
    mockFs(fileSystem);
  });

  beforeEach(() => {
    Logger.logHeader = jest.fn();
    Logger.log = jest.fn();
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("lists work item templates", async () => {
    await agileWorkTemplateList.parseAsync(CliSimulator.createArgs());
    expect(Logger.logHeader).toBeCalledWith("Work Item Templates");
    // Currently a stub for the predefined templates we have in this repo
    // Will need to be more sophisticated when this command fetches templates
    // from the playbook repo
    expect(Logger.log).toBeCalledTimes(2);
  });
});
