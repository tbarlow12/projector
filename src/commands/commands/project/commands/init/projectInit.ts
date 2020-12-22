import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { ConfigService } from "../../../../../services";

export const projectInit = new Command()
  .name("init")
  .description("Local Configuration Initialization")
  .action((args: any[]) => {
    const config = ConfigService.createInitialConfig(args);
    writeFileSync("cse.json", JSON.stringify(config, null, 4));
  });
