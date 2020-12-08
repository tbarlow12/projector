import { Command } from "../../../../extensions";
import { BacklogServiceFactory } from "../../../../factories/backlogServiceFactory";
import { BacklogItemType } from "../../../../models";
import { CseCliConfig } from "../../../../models/config/cliConfig";

export const init = new Command()
  .name("init")
  .description("Backlog Initialization")
  .execute(async (config: CseCliConfig) => {
    const { backlog } = config;
    const backlogService = BacklogServiceFactory.get(backlog);
    await backlogService.createBacklogItem({
      name: "Test",
      type: BacklogItemType.Feature,
    });
  });