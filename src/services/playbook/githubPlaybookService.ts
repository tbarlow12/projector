import { ConfigValue } from "../../constants";
import { PlaybookService, RepoItem, RepoService, TemplateItem } from "../../models";
import { Config, FileUtils } from "../../utils";

export class GithubPlaybookService implements PlaybookService {
  private repoService: RepoService;
  private playbookOwnerName: string;
  private playbookRepoName: string;

  constructor(repoService: RepoService) {
    this.repoService = repoService;
    this.playbookOwnerName = Config.getValue(ConfigValue.PlaybookOwnerName);
    this.playbookRepoName = Config.getValue(ConfigValue.PlaybookRepoName);
  }

  public async getTemplates(predicate?: (templateItem: TemplateItem) => boolean): Promise<TemplateItem[]> {
    const fileNames = ["projector.json", "projectorrc.json", ".projectorrc"];
    let repoItem: RepoItem | undefined = undefined;

    for (const index in fileNames) {
      try {
        const fileName = fileNames[index];
        repoItem = await this.getRepoItem(fileName);
      } catch (e) {
        /** Swallow the error here. If we can't find it later, throw then. */
      }

      if (repoItem && repoItem.content) {
        break;
      }
    }

    if (!repoItem || !repoItem.content) {
      throw new Error(
        `Could not find a valid projector configuration at root. Add one of the following to your playbook:\n${fileNames.join(
          "\n",
        )}`,
      );
    }

    const templates: TemplateItem[] = repoItem.content;

    return predicate ? templates.filter((template) => predicate(template)) : templates;
  }

  public async downloadTemplate(templateName: string, localRelativePath: string): Promise<void> {
    const templates = await this.getTemplates((template) => {
      return template.name === templateName;
    });

    if (!templates || templates.length <= 0) {
      throw new Error(`Couldn't find template ${templateName}`);
    }

    if (templates.length > 1) {
      throw new Error(
        `Found multiple templates matching name ${templateName}:\n` +
          templates.map((template) => template.name).join("\n"),
      );
    }

    return await this.downloadRepoItem(templates[0].filePath, localRelativePath);
  }

  private async getRepoItem(pathInRepo: string): Promise<RepoItem> {
    return this.repoService.getRepoItem(this.playbookOwnerName, this.playbookRepoName, pathInRepo, true);
  }

  private async downloadRepoItem(pathInRepo: string, localRelativePath: string): Promise<void> {
    this.repoService.downloadRepoItem(
      this.playbookOwnerName,
      this.playbookRepoName,
      pathInRepo,
      undefined,
      localRelativePath,
    );
  }
}
