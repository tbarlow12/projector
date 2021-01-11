import { FileConstants } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { BacklogItem, BacklogItemTemplate, ServiceCollection } from "../../../../../../../models";
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

    for (const item of items) {
      logBacklogItem(item);
    }
  });

/**
 * Log a one-line backlog item description. Logs children recursively
 *
 * @param {BacklogItem} item Backlog item
 * @param {string|undefined} parentId Parent ID if it has one
 */
function logBacklogItem(item: BacklogItem, parentId?: string): void {
  const { id, name, children, url } = item;
  Logger.log(`${id}${parentId ? ` (Child of ${parentId})` : ""} - ${name}${url ? ` (${url})` : ""}`);
  if (children) {
    for (const child of children) {
      logBacklogItem(child, id);
    }
  }
}
