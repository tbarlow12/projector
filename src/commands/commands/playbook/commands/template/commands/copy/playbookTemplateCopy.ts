import { Command } from "../../../../../../../extensions";
import { ServiceCollection } from "../../../../../../../models";

export interface PlaybookTemplateCopyOptions {
  templateName: string;
  branch: string;
  githubToken: string;
  outPath: string;
}

export const playbookTemplateCopy = new Command()
  .name("copy")
  .description("Copy templates from playbook to local working directory")
  .option("-b, --branch <branch>", "Branch of playbook to use")
  .option("-g, --github-token <github-token>", "GitHub personal access token")
  .option("-t, --template-name <template-name>", "Name of the template to download")
  .option("-o, --out-path <out-path>", "Local path to which file will be written. Defaults to name of template file")
  .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateCopyOptions) => {
    const { playbookService } = serviceCollection;
    const { templateName, outPath } = options;
    await playbookService.downloadTemplate(templateName, outPath);
  });
