import { Command } from "../../extensions";
import { writeFileSync } from "fs"
import { ConfigService } from "../../services/config/configServices";
import { BaseBacklogService } from "../../services";

export const init = new Command()
  .name("init")
  .description("Local Configuration Initialization")
  .action((args: any[]) => {
    const config = ConfigService.createInitialConfig(args);
    const sampleBacklogItems = BaseBacklogService.createSampleBacklogItems();
    writeFileSync("cse.json", JSON.stringify(config, null, 4));
    writeFileSync("backlogItems.json", JSON.stringify(sampleBacklogItems, null, 4));
  });