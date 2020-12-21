import { ConfigValue } from "../../../../../../constants";
import { Command } from "../../../../../../extensions";
import { RepoServiceFactory } from "../../../../../../factories";
import { CseCliConfig } from "../../../../../../models";
import { RepoServiceProvider } from "../../../../../../services";
import { Config } from "../../../../../../utils";

export interface PlaybookTemplateCopyOptions {
  path: string;
  branch: string;
}

export const playbookTemplateCopy = new Command()
  .name("copy")
  .description("Copy templates from playbook to local working directory")
  .option("-p, --path <template-path>", "Path to template within playbook repo")
  .option("-b, --branch <branch>", "Branch of playbook to use")
  .option("-o, --out-path <out-path>", "Local path to which file will be written. Defaults to name of template file")
  .execute(async (config: CseCliConfig, options: PlaybookTemplateCopyOptions) => {
    const githubService = RepoServiceFactory.get({
      providerName: RepoServiceProvider.GitHub
    });

    const { path, branch } = options;
    const playbookOwnerName = Config.getValue(ConfigValue.PlaybookOwnerName);
    const playbookRepoName = Config.getValue(ConfigValue.PlaybookRepoName);
    console.log(`Getting template from ${playbookOwnerName}/${playbookRepoName} at path ${path}`);
    await githubService.downloadRepoItem(playbookOwnerName, playbookRepoName, path, branch);
  });
