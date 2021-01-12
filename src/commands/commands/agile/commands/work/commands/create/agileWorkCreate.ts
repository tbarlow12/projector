import { FileConstants } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { BacklogItemTemplate, Parameters, ServiceCollection } from "../../../../../../../models";
import { FileUtils, Logger } from "../../../../../../../utils";

export interface AgileInitializationOptions {
  file: string;
  params: string;
}

export const agileWorkCreate = new Command()
  .name("create")
  .description("Work Item Creation")
  .option("-f, --file <file>", "File containing backlog item template")
  .option("-p, --params <params>", "Path to JSON file with values for all variable interpolation")
  .addAction(async (serviceCollection: ServiceCollection, options: AgileInitializationOptions) => {
    const { agileService } = serviceCollection;

    if (!agileService) {
      throw new Error("Section 'agile' must be configured for this command");
    }

    // Read agile items from provided file
    const { file, params: paramsPath } = options;
    const templatePath = file || FileConstants.backlogItemsFileName;

    const parameters = FileUtils.readJson<Parameters>(paramsPath);
    const template = FileUtils.readJson<BacklogItemTemplate>(templatePath, parameters);
    if (!template) {
      throw new Error(`Could not find template '${templatePath}'`);
    }

    // Create Backlog Items
    const items = await agileService.createBacklogItems(template.items);
    Logger.logHeader("Created Items");

    items.forEach((item) => Logger.log(`${item.id} - ${item.name}`));
  });
