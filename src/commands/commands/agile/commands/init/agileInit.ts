import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { BaseAgileService } from "../../../../../services";

export const agileInit = new Command()
  .name("init")
  .description("Agile Configuration Initialization")
  .addAction(() => {
    const sampleBacklogItems = BaseAgileService.createSampleBacklogItems();
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });
