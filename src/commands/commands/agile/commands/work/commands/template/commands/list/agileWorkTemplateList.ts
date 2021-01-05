import { Command } from "../../../../../../../../../extensions";
import { BacklogItemTemplate } from "../../../../../../../../../models";
import { emptyBacklogItemTemplate, exampleBacklogItemTemplate } from "../../../../../../../../../samples";
import { Logger } from "../../../../../../../../../utils";

export const agileWorkTemplateList = new Command()
  .name("list")
  .description("List available work item templates")
  .addAction(async () => {
    // Stub for now - will fetch templates from repo
    const templates: BacklogItemTemplate[] = [exampleBacklogItemTemplate, emptyBacklogItemTemplate];

    Logger.logHeader("Work Item Templates");
    templates.forEach((template) => Logger.log(template.name));
  });
