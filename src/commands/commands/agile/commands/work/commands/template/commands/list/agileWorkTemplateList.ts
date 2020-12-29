import { Command } from "../../../../../../../../../extensions";
import { BacklogItemTemplate } from "../../../../../../../../../models";
import { emptyBacklogItemTemplate, exampleBacklogItemTemplate } from "../../../../../../../../../samples";

export const agileWorkTemplateList = new Command()
  .name("list")
  .description("List available work item templates")
  .addAction(async () => {
    // Stub for now - will fetch templates from repo
    const templates: BacklogItemTemplate[] = [
      exampleBacklogItemTemplate,
      emptyBacklogItemTemplate,
    ];

    console.log("\nWork Item Templates");
    console.log("-------------------");
    templates.forEach(template => console.log(template.name));
  });
