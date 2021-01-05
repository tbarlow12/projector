import { ConfigValue } from "../../constants";
import { BacklogItemTemplate, PlaybookService, RepoItem, RepoService } from "../../models";
import { emptyBacklogItemTemplate, exampleBacklogItemTemplate } from "../../samples";
import { Config } from "../../utils";

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
    return Promise.resolve([exampleBacklogItemTemplate, emptyBacklogItemTemplate]);
  }

  public async getRepoItem(pathInRepo: string, includeContent = false): Promise<RepoItem> {
    return this.repoService.getRepoItem(this.playbookOwnerName, this.playbookRepoName, pathInRepo, includeContent);
  }
}
