import { ConfigValue } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { ServiceCollection } from "../../../../../../../models";
import { Config, Logger } from "../../../../../../../utils";

export interface PlaybookTemplateCopyOptions {
  path: string;
  branch: string;
  githubToken: string;
}

export const playbookTemplateCopy = new Command()
  .name("copy")
  .description("Copy templates from playbook to local working directory")
  .option("-b, --branch <branch>", "Branch of playbook to use")
  .option("-g, --github-token <github-token>", "GitHub personal access token")
  .option("-p, --path <template-path>", "Path to template within playbook repo")
  .option("-o, --out-path <out-path>", "Local path to which file will be written. Defaults to name of template file")
  .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateCopyOptions) => {
    const { repoService } = serviceCollection;

    const { path, branch } = options;

    const playbookOwnerName: string = Config.getValue(ConfigValue.PlaybookOwnerName);
    const playbookRepoName: string = Config.getValue(ConfigValue.PlaybookRepoName);

    Logger.log(`Getting template from ${playbookOwnerName}/${playbookRepoName} at path ${path}`);
    await repoService.downloadRepoItem(playbookOwnerName, playbookRepoName, path, branch);
  });
