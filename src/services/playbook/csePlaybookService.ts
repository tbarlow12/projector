import { ConfigValue } from "../../constants";
import { BacklogItemTemplate, PlaybookService, RepoItem, RepoService } from "../../models";
import { emptyBacklogItemTemplate, exampleBacklogItemTemplate } from "../../samples";
import { Config, FileUtils } from "../../utils";

export class CsePlaybookService implements PlaybookService {
  private repoService: RepoService;
  private playbookOwnerName: string;
  private playbookRepoName: string;

  constructor(repoService: RepoService) {
    this.repoService = repoService;
    this.playbookOwnerName = Config.getValue(ConfigValue.PlaybookOwnerName);
    this.playbookRepoName = Config.getValue(ConfigValue.PlaybookRepoName);
  }

  public async getTemplates(): Promise<BacklogItemTemplate[]> {
    // Stub for now until we fetch templates from the repo
    return Promise.resolve([exampleBacklogItemTemplate, emptyBacklogItemTemplate]);
  }

  public async getRepoItem(pathInRepo: string, includeContent = false): Promise<RepoItem> {
    return this.repoService.getRepoItem(this.playbookOwnerName, this.playbookRepoName, pathInRepo, includeContent);
  }

  public async downloadRepoItem(pathInRepo: string, localRelativePath: string): Promise<void> {
    const { content } = await this.getRepoItem(pathInRepo, true);
    if (!content) {
      throw new Error(`Couldn't get content from repo path ${pathInRepo}`);
    }

    FileUtils.writeFile(localRelativePath, content);
  }
}
