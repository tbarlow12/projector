import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { AgileServiceProvider, ConfigService } from "../../../../../services";

export interface ProjectCreationOptions {
  agileProvider?: AgileServiceProvider;
  baseUrl?: string;
  project?: string;
  token?: string;
}

export const projectInit = new Command()
  .name("init")
  .description("Local Configuration Initialization")
  .option("-b, --agile-provider <agile-provider>", "Agile provider (currently only supports and defaults to 'azdo')", "azdo")
  .option("-u, --base-url <base-url>", "Base URL for Agile Provider project")
  .option("-p, --project <project>", "Agile provider project")
  .option("-t, --token <token>", "Agile provider access token")
  .addAction((options: ProjectCreationOptions) => {
    const config = ConfigService.createInitialConfig(options);
    writeFileSync("cse.json", JSON.stringify(config, null, 4));
  });
