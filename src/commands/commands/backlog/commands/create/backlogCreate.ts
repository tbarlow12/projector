import { Command } from "../../../../../extensions";
import { BacklogServiceFactory } from "../../../../../factories/backlogServiceFactory";
import { BacklogItem, CseCliConfig } from "../../../../../models";
import { FileUtils } from "../../../../../utils";

export interface BacklogInitializationOptions {
  file: string;
}

export const backlogCreate = new Command()
  .name("create")
  .description("Backlog Creation")
  .addAction(async (options: BacklogInitializationOptions, config: CseCliConfig) => {
    const { backlog: backlogConfig } = config;
    if (!backlogConfig) {
      throw new Error("Section backlog is required for this operation");
    }
    // Instantiate backlog service from factory
    const backlogService = BacklogServiceFactory.get(backlogConfig);

    // Read backlog items from provided file
    const { file } = options;
    const backlogItems: BacklogItem[] = await FileUtils.readJson(file);
    
    // Create Backlog Items
    await backlogService.createBacklogItems(backlogItems);
  });
