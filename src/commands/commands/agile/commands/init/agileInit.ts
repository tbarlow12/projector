import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { BaseBacklogService } from "../../../../../services";

export const agileInit = new Command()
  .name("init")
  .description("Agile Configuration Initialization")
  .addAction(() => {
    const sampleBacklogItems = BaseBacklogService.createSampleBacklogItems();
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });
