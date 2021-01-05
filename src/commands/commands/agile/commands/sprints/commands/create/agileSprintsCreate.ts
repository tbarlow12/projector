import { Command } from "../../../../../../../extensions";
import { ServiceCollection } from "../../../../../../../models";

export const agileSprintsCreate = new Command()
  .name("create")
  .description("Create Sprints with Agile Provider")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .addAction(async (serviceCollection: ServiceCollection) => {
    const { agileService } = serviceCollection;

    if (!agileService) {
      throw new Error("Section 'agile' must be configured for this command");
    }

    await agileService.createSprints();
  });
