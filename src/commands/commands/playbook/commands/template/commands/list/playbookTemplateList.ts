import path from "path";
import { ConfigValue } from "../../../../../../../constants";
import { Command } from "../../../../../../../extensions";
import { RepoServiceFactory } from "../../../../../../../factories";
import { CseCliConfig, templateItem } from "../../../../../../../models";
import { RepoServiceProvider } from "../../../../../../../services";
import { Config } from "../../../../../../../utils";

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
  .option("-g, --github-token <github-token>", "GitHub personal access token")
  .option("-p, --filepath <filepath>", "Path to template file in playbook", path.sep)
  .addAction(async (options: PlaybookTemplateListOptions, config: CseCliConfig) => {
    const { branch, filename, filepath, githubToken } = options;
    // If access token passed as option, use that over configured value
    if (githubToken) {
      config.github = {
        ...config.github,
        personalAccessToken: githubToken,
      };
    }

    const { playbook, github } = config;

    const githubService = RepoServiceFactory.get({
      providerName: RepoServiceProvider.GitHub,
      ...github,
    });

    const playbookOwnerName: string = playbook?.playbookOwner || Config.getValue(ConfigValue.PlaybookOwnerName);
    const playbookRepoName: string = playbook?.playbookRepo || Config.getValue(ConfigValue.PlaybookRepoName);

    const templateFilePath: string = path.join(filepath, filename);

    console.log(`Getting templates from ${playbookOwnerName}/${playbookRepoName} at path ${templateFilePath}`);
    const templates = await githubService.getRepoItem(
      playbookOwnerName,
      playbookRepoName,
      templateFilePath,
      true,
      branch,
    );

    if (!templates.content) {
      console.log("Templates file appears to be empty.");
    } else {
      const templateItems: templateItem[] = templates.content;

      for (const index in templateItems) {
        console.log(templateItems[index].templateName);
      }
    }
  });
