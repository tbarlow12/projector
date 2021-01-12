import { writeFileSync } from "fs";
import { Command } from "../../../../../extensions";
import { ServiceCollection } from "../../../../../models";
import { AgileServiceProvider, ConfigService } from "../../../../../services";

export interface ProjectCreationOptions {
  agileProvider?: AgileServiceProvider;
}

export const projectInit = new Command()
  .name("init")
  .description("Initialize local projector configuration")
  .option("-a, --agile-provider <agile-provider>", "Agile provider (currently only supports 'azdo')", "azdo")
  .addAction((serviceCollection: ServiceCollection, options: ProjectCreationOptions) => {
    const config = ConfigService.createInitialConfig(options);
    writeFileSync("projector.json", JSON.stringify(config, null, 4));
  });
