import { Command } from "../../extensions";
import { writeFileSync } from "fs"
import { ConfigService } from "../../services/config/configServices";

export const init = new Command()
  .name("init")
  .description("Local Configuration Initialization")
  .action((args: any[]) => {
    const config = ConfigService.createInitialConfig(args);
    writeFileSync("cse.json", JSON.stringify(config, null, 4));
  });