import mockFs from "mock-fs";
import { AgileServiceFactory } from "../../../../../../../factories";
import { BacklogItem, BacklogItemTemplate } from "../../../../../../../models";
import { CliSimulator, ModelSimulator, SimulatorAgileService } from "../../../../../../../test";
import { Logger } from "../../../../../../../utils";
import { agileWorkCreate } from "./agileWorkCreate";

describe("Agile Work Create Command", () => {
  const backlogItemFileName = "myItems.json";
  const parameterizedBacklogItemFileName = "myParamItems.json";
  const projectorConfigFileName = "projector.json";
  const paramsFileName = "params.json";
  const variableValue = "hello";
  const backlogItemTemplate = ModelSimulator.createTestBacklogItemTemplate();
  const projectorConfig = ModelSimulator.createTestConfig();
  const parameterizedBacklogItemTemplate: BacklogItemTemplate = {
    ...backlogItemTemplate,
    items: backlogItemTemplate.items.map((item: BacklogItem) => {
      return {
        ...item,
        name: item.name + " ${variable}",
      };
    }),
  };

  beforeAll(() => {
    const fileSystem: { [fileName: string]: string } = {};
    fileSystem[backlogItemFileName] = JSON.stringify(backlogItemTemplate);
    fileSystem[projectorConfigFileName] = JSON.stringify(projectorConfig);
    fileSystem[paramsFileName] = JSON.stringify({ variable: variableValue });
    fileSystem[parameterizedBacklogItemFileName] = JSON.stringify(parameterizedBacklogItemTemplate);
    mockFs(fileSystem, { createCwd: true, createTmp: true });
  });

  beforeEach(() => {
    Logger.log = jest.fn();
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("contains correct number of sub-commands", () => {
    expect(agileWorkCreate.commands).toHaveLength(0);
  });

  it("creates backlog items from a file", async () => {
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

  it("creates parameterized backlog items from a file", async () => {
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
          value: parameterizedBacklogItemFileName,
        },
        {
          name: "--params",
          value: paramsFileName,
        },
      ]),
    );

    const expectedBacklogItemTemplate: BacklogItemTemplate = {
      ...backlogItemTemplate,
      items: backlogItemTemplate.items.map((item: BacklogItem) => {
        return {
          ...item,
          name: item.name + ` ${variableValue}`,
        };
      }),
    };

    expect(createBacklogItems).toBeCalledWith(expectedBacklogItemTemplate.items);
    // Log header and one line for each backlog item
    expect(Logger.log).toBeCalledTimes(expectedBacklogItemTemplate.items.length + 2);
  });
});
