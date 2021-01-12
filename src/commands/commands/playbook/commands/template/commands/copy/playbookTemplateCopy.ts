import { Command } from "../../../../../../../extensions";
import { ServiceCollection } from "../../../../../../../models";

export interface PlaybookTemplateCopyOptions {
  path: string;
  branch: string;
  githubToken: string;
  outPath: string;
}

export const playbookTemplateCopy = new Command()
  .name("copy")
  .description("Copy templates from playbook to local working directory")
  .option("-b, --branch <branch>", "Branch of playbook repo to use")
  .option(
    "-g, --github-token <github-token>",
    "GitHub personal access token. Not required, but increases number of allowed requests",
  )
  .option("-p, --path <template-path>", "Path to template within playbook repo")
  .option(
    "-o, --out-path <out-path>",
    "Local path to which file will be written. Defaults to name of template file in the working directory. Will overwrite existing file",
  )
  .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateCopyOptions) => {
    const { playbookService } = serviceCollection;
    const { path, outPath } = options;
    await playbookService.downloadRepoItem(path, outPath);
  });
