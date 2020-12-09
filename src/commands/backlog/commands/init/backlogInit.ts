import { Command } from "../../../../extensions";
import { BacklogServiceFactory } from "../../../../factories/backlogServiceFactory";
import { BacklogItem, BacklogItemType, CseCliConfig } from "../../../../models";
import { readFileSync } from "fs";
import { join } from "path";
import { FileUtils } from "../../../../utils";

export interface BacklogInitializationOptions {
  file: string;
}

export const backlogInit = new Command()
  .name("init")
  .description("Backlog Initialization")
  .option("-f, --file", "JSON file with backlog items")
  .execute(async (config: CseCliConfig, options: BacklogInitializationOptions) => {
    const { backlog } = config;
    const backlogService = BacklogServiceFactory.get(backlog);
    const { file } = options;
    const backlogItems: BacklogItem[] = FileUtils.readJson(file);
    await backlogService.createBacklogItems(backlogItems);
  });