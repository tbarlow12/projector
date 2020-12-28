import { Command } from "../../../../../extensions";
import { AgileServiceFactory } from "../../../../../factories";
import { BacklogItem, CseCliConfig } from "../../../../../models";
import { FileUtils } from "../../../../../utils";

export interface AgileInitializationOptions {
  file: string;
}

export const agileCreate = new Command()
  .name("create")
  .description("Backlog Creation")
  .addAction(async (options: AgileInitializationOptions, config: CseCliConfig) => {
    const { agile: agileConfig } = config;
    if (!agileConfig) {
      throw new Error("Section agile is required for this operation");
    }
    // Instantiate agile service from factory
    const agileService = AgileServiceFactory.get(agileConfig);

    // Read agile items from provided file
    const { file } = options;
    const agileItems: BacklogItem[] = await FileUtils.readJson(file);
    
    // Create Backlog Items
    await agileService.createBacklogItems(agileItems);
  });
