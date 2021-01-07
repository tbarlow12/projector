import path from "path";
import { Command } from "../../../../../../../extensions";
import { Logger } from "../../../../../../../utils";
import { ServiceCollection } from "../../../../../../../models/general/serviceCollection";
import { TemplateItem } from "../../../../../../../models";

export interface PlaybookTemplateListOptions {
  branch: string;
  filename: string;
  filepath: string;
  githubToken: string;
}

export const playbookTemplateList = new Command()
  .name("list")
  .description("List available templates.")
  .option("-b, --branch <branch>", "Branch of playbook to use")
  .option("-f, --filename <filename>", "Name of template file", "templates.json")
  .option("-p, --filepath <filepath>", "Path to template file in playbook", path.sep)
  .addAction(async (serviceCollection: ServiceCollection) => {
    const { playbookService } = serviceCollection;

    const templates: TemplateItem[] = await playbookService.getTemplates();

    if (!templates || templates.length === 0) {
      Logger.log("Templates file appears to be empty.");
    } else {
      for (const index in templates) {
        Logger.log(templates[index].name);
      }
    }
  });
