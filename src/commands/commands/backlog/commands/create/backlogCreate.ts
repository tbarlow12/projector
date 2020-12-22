import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { BacklogServiceFactory } from "../../../../../factories/backlogServiceFactory";
import { BacklogItem, CseCliConfig } from "../../../../../models";
import { BaseBacklogService } from "../../../../../services";
import { FileUtils } from "../../../../../utils";

export interface BacklogInitializationOptions {
  file: string;
}

export const backlogCreate = new Command()
  .name("create")
  .description("Backlog Creation")
  .addAction(async (options: BacklogInitializationOptions, config: CseCliConfig) => {
    const { backlog } = config;
    const backlogService = BacklogServiceFactory.get(backlog);
    const { file } = options;
    const backlogItems: BacklogItem[] = await FileUtils.readJson(file);
    await backlogService.createBacklogItems(backlogItems);
    const sampleBacklogItems = BaseBacklogService.createSampleBacklogItems();
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });
