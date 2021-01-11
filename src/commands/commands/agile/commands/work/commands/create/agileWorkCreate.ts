import { FileConstants } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { ServiceCollection } from "../../../../../../../models";
import { Logger } from "../../../../../../../utils";

export interface AgileInitializationOptions {
  file: string;
}

export const agileWorkCreate = new Command()
  .name("create")
  .description("Work Item Creation")
  .option("-f, --file <file>", "File containing backlog item template")
  .addAction(async (serviceCollection: ServiceCollection, options: AgileInitializationOptions) => {
    const { agileService, backlogItemStorageService } = serviceCollection;

    if (!agileService) {
      throw new Error("Section 'agile' must be configured for this command");
    }

    // Read agile items from provided file
    const { file } = options;
    const fileName = file ?? FileConstants.backlogItemsFileName;
    const template = await backlogItemStorageService.read(fileName);

    if (!template) {
      Logger.log(`Could not find a template at ${fileName}`);
    } else {
      // Create Backlog Items
      const items = await agileService.createBacklogItems(template.items);
      Logger.logHeader("Created Items");

      items.forEach((item) => Logger.log(`${item.id} - ${item.name}`));
    }
  });
