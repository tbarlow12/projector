import { PlaybookService, RepoService } from "../models";
import { GithubPlaybookService, GitHubRepoService } from "../services";

export class PlaybookServiceFactory {
  public static get(repoService: RepoService): PlaybookService {
    if (repoService instanceof GitHubRepoService) {
      return new GithubPlaybookService(repoService);
    }
    throw new Error("Not Implemented");
  }
}
