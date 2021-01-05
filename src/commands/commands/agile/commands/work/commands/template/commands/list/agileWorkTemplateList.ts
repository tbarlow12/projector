import { Command } from "../../../../../../../../../extensions";
import { ServiceCollection } from "../../../../../../../../../models";
import { Logger } from "../../../../../../../../../utils";

export const agileWorkTemplateList = new Command()
  .name("list")
  .description("List available work item templates")
  .addAction(async (serviceCollection: ServiceCollection) => {
    const { playbookService } = serviceCollection;
    const templates = await playbookService.getTemplates();
    Logger.logHeader("Work Item Templates");
    templates.forEach((template) => Logger.log(template.name));
  });
