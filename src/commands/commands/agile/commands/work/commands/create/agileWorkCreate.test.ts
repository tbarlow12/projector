import mockFs from "mock-fs";
import { AgileServiceFactory } from "../../../../../../../factories";
import { BacklogItem } from "../../../../../../../models";
import { CliSimulator, ModelSimulator, SimulatorAgileService } from "../../../../../../../test";
import { Logger } from "../../../../../../../utils";
import { agileWorkCreate } from "./agileWorkCreate";

describe("Agile Work Create Command", () => {
  const backlogItemFileName = "myItems.json";
  const cseConfigFileName = "cse.json";
  const backlogItemTemplate = ModelSimulator.createTestBacklogItemTemplate();
  const cseConfig = ModelSimulator.createTestConfig();

  beforeAll(() => {
    const fileSystem: { [fileName: string]: string } = {};
    fileSystem[backlogItemFileName] = JSON.stringify(backlogItemTemplate);
    fileSystem[cseConfigFileName] = JSON.stringify(cseConfig);
    mockFs(fileSystem);
    Logger.log = jest.fn();
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("contains correct number of sub-commands", () => {
    expect(agileWorkCreate.commands).toHaveLength(0);
  });

  it("runs a test", async () => {
    const createBacklogItems = jest.fn((items: BacklogItem[]) =>
      Promise.resolve(
        items.map((item) => {
          return {
            ...item,
            id: "itemId",
          };
        }),
      ),
    );

    AgileServiceFactory.get = jest.fn(
      () =>
        new SimulatorAgileService({
          createBacklogItems,
        }),
    );

    await agileWorkCreate.parseAsync(
      CliSimulator.createArgs([
        {
          name: "--file",
          value: backlogItemFileName,
        },
      ]),
    );

    expect(createBacklogItems).toBeCalledWith(backlogItemTemplate.items);
    // Log header and one line for each backlog item
    expect(Logger.log).toBeCalledTimes(backlogItemTemplate.items.length + 2);
  });
});
