import { ConfigValue } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { RepoServiceFactory } from "../../../../../../../factories";
import { CseCliConfig } from "../../../../../../../models";
import { RepoServiceProvider } from "../../../../../../../services";
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
  .addAction(async (options: PlaybookTemplateCopyOptions, config: CseCliConfig) => {
    const { path, branch, githubToken } = options;
    // If access token passed as option, use that over configured value
    if (githubToken) {
      config.github = {
        ...config.github,
        personalAccessToken: githubToken
      };
    }

    const { playbook, github } = config;

    const githubService = RepoServiceFactory.get({
      providerName: RepoServiceProvider.GitHub,
      ...github
    });

    const playbookOwnerName: string = playbook?.playbookOwner || Config.getValue(ConfigValue.PlaybookOwnerName);
    const playbookRepoName: string = playbook?.playbookRepo || Config.getValue(ConfigValue.PlaybookRepoName);

    Logger.log(`Getting template from ${playbookOwnerName}/${playbookRepoName} at path ${path}`);
    await githubService.downloadRepoItem(playbookOwnerName, playbookRepoName, path, branch);
  });
