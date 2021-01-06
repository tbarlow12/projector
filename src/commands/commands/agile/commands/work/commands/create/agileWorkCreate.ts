import { FileConstants } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { BacklogItemTemplate, ServiceCollection } from "../../../../../../../models";
import { FileUtils, Logger } from "../../../../../../../utils";

export interface AgileInitializationOptions {
  file: string;
}

export const agileWorkCreate = new Command()
  .name("create")
  .description("Work Item Creation")
  .option("-f, --file <file>", "File containing backlog item template")
  .addAction(async (serviceCollection: ServiceCollection, options: AgileInitializationOptions) => {
    const { agileService } = serviceCollection;

    if (!agileService) {
      throw new Error("Section 'agile' must be configured for this command");
    }

    // Read agile items from provided file
    const { file } = options;
    const template: BacklogItemTemplate = await FileUtils.readJson(file || FileConstants.backlogItemsFileName);

    // Create Backlog Items
    const items = await agileService.createBacklogItems(template.items);
    Logger.logHeader("Created Items");

    items.forEach((item) => Logger.log(`${item.id} - ${item.name}`));
  });
