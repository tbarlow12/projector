import { Command } from "../../../../../../../extensions";
import { AgileServiceFactory } from "../../../../../../../factories";
import { CseCliConfig } from "../../../../../../../models";

export const agileSprintsCreate = new Command()
  .name("create")
  .description("Create Sprints with Agile Provider")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .addAction(async (options: any, config: CseCliConfig) => {
    const { agile } = config;
    if (!agile) {
      throw new Error("Section agile required for this command");
    }
    const agileService = AgileServiceFactory.get(agile);
    await agileService.createSprints();
  });
