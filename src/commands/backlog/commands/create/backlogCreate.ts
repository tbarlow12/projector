import { writeFileSync } from "fs";
import { Command } from "../../../../extensions";
import { BacklogServiceFactory } from "../../../../factories/backlogServiceFactory";
import { BacklogItem, CseCliConfig } from "../../../../models";
import { BaseBacklogService } from "../../../../services";
import { FileUtils } from "../../../../utils";

export interface BacklogInitializationOptions {
  file: string;
}

export const backlogCreate = new Command()
  .name("create")
  .description("Backlog Creation")
  .option("-f, --file", "JSON file with backlog items")
  .execute(async (config: CseCliConfig, options: BacklogInitializationOptions) => {
    const { backlog } = config;
    const backlogService = BacklogServiceFactory.get(backlog);
    const { file } = options;
    const backlogItems: BacklogItem[] = FileUtils.readJson(file);
    await backlogService.createBacklogItems(backlogItems);
    const sampleBacklogItems = BaseBacklogService.createSampleBacklogItems();
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });