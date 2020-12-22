import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { BaseBacklogService } from "../../../../../services";

export const backlogInit = new Command()
  .name("hi")
  .description("Backlog Initialization")
  .addAction(() => {
    const sampleBacklogItems = BaseBacklogService.createSampleBacklogItems();
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });
