import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { ConfigService } from "../../../../../services";

export const projectInit = new Command()
  .name("init")
  .description("Local Configuration Initialization")
  .option("-b, --backlog-provider <backlog-provider>", "Backlog provider (currently only supports and defaults to 'azdo')", "azdo")
  .addAction((options) => {
    const config = ConfigService.createInitialConfig(options);
    writeFileSync("cse.json", JSON.stringify(config, null, 4));
  });
