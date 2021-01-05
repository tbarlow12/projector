import { FileConstants } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { AgileServiceFactory } from "../../../../../../../factories";
import { BacklogItemTemplate, CseCliConfig } from "../../../../../../../models";
import { FileUtils, Logger } from "../../../../../../../utils";

export interface AgileInitializationOptions {
  file: string;
}

export const agileWorkCreate = new Command()
  .name("create")
  .description("Work Item Creation")
  .option("-f, --file <file>", "File containing backlog item template")
  .addAction(async (options: AgileInitializationOptions, config: CseCliConfig) => {
    const { agile: agileConfig } = config;
    if (!agileConfig) {
      throw new Error("Section agile is required for this operation");
    }
    // Instantiate agile service from factory
    const agileService = AgileServiceFactory.get(agileConfig);

    // Read agile items from provided file
    const { file } = options;
    const template: BacklogItemTemplate = await FileUtils.readJson(file || FileConstants.backlogItemsFileName);

    // Create Backlog Items
    const items = await agileService.createBacklogItems(template.items);
    Logger.logHeader("Created Items");

    items.forEach((item) => Logger.log(`${item.id} - ${item.name}`));
  });
