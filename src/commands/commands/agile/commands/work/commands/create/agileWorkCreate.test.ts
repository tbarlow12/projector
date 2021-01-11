import { FileConstants } from "../../../../../../../constants";
import { AgileServiceFactory } from "../../../../../../../factories";
import { StorageServiceFactory } from "../../../../../../../factories/storageServiceFactory";
import { BacklogItem } from "../../../../../../../models";
import { SimulatedStorageService } from "../../../../../../../services/storage/simulatedStorageService";
import { CliSimulator, ModelSimulator, SimulatorAgileService } from "../../../../../../../test";
import { Logger } from "../../../../../../../utils";
import { agileWorkCreate } from "./agileWorkCreate";

describe("Agile Work Create Command", () => {
  const backlogItemTemplate = ModelSimulator.createTestBacklogItemTemplate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const simulatedStorageService = new SimulatedStorageService<any>();

  const projectorConfig = ModelSimulator.createTestConfig();

  beforeAll(async () => {
    await simulatedStorageService.write(FileConstants.backlogItemsFileName, backlogItemTemplate);
    await simulatedStorageService.write(FileConstants.configFileName, projectorConfig);
    Logger.log = jest.fn();
  });

  it("contains correct number of sub-commands", async () => {
    expect(await agileWorkCreate.commands).toHaveLength(0);
  });

  it("creates backlog items in an agile provider", async () => {
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

    StorageServiceFactory.get = jest.fn(() => simulatedStorageService);

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
          value: FileConstants.backlogItemsFileName,
        },
      ]),
    );

    expect(createBacklogItems).toBeCalledWith(backlogItemTemplate.items);
    // Log header and one line for each backlog item
    expect(Logger.log).toBeCalledTimes(backlogItemTemplate.items.length + 2);
  });
});
