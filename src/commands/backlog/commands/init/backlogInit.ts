import { writeFileSync } from "fs";
import { Command } from "../../../../extensions";
import { BaseBacklogService } from "../../../../services";

export const backlogInit = new Command()
  .name("init")
  .description("Backlog Initialization")
  .execute(() => {
    const sampleBacklogItems = BaseBacklogService.createSampleBacklogItems();
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });
