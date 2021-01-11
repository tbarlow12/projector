import { Octokit } from "@octokit/rest";
import axios from "axios";
import { basename } from "path";
import { ConfigValue } from "../../../constants";
import { GitHubConfig, RepoItem, RepoItemType, RepoService, StorageService } from "../../../models";
import { Config } from "../../../utils";

export interface GitHubRepoServiceProviderOptions {
  personalAccessToken: string;
}

export class GitHubRepoService implements RepoService {
  private github: Octokit;
  private storageService: StorageService<RepoItem>;

  constructor(storageService: StorageService<RepoItem>, config?: GitHubConfig) {
    // Prefer environment variable over config
    const accessToken = Config.getValueWithDefault(ConfigValue.GithubAccessToken, config?.personalAccessToken);
    this.storageService = storageService;

    this.github = new Octokit({
      userAgent: "projector",
      auth: accessToken,
    });
  }

  public async listRepoItems(owner: string, repo: string, path?: string, branch?: string): Promise<RepoItem[]> {
    const repoItem = await this.getRepoItem(owner, repo, path, false, branch);
    const { type, children } = repoItem;
    return type === RepoItemType.Directory && children ? children : [];
  }

  public async downloadRepoItem(
    owner: string,
    repo: string,
    path?: string,
    branch?: string,
    outputPath?: string,
  ): Promise<void> {
    const repoItem = await this.getRepoItem(owner, repo, path, true, branch);
    const fileName = `${repoItem.name}.json`;
    await this.storageService.write(fileName, repoItem, outputPath);
  }

  public async getRepoItem(
    owner: string,
    repo: string,
    path = "",
    includeContent?: boolean,
    branch?: string,
  ): Promise<RepoItem> {
    try {
      const { data } = await this.github.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      if (data instanceof Array) {
        const children: RepoItem[] = await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data as any[]).map(async (item) => {
            return await this.getRepoItem(owner, repo, item.path, includeContent);
          }),
        );
        return {
          name: basename(path),
          type: RepoItemType.Directory,
          path,
          children,
        };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { download_url } = data as any;
        return {
          name: basename(path),
          type: RepoItemType.File,
          path,
          content: includeContent ? (await axios.get(download_url)).data : undefined,
        };
      }
    } catch (err) {
      // TODO: should eliminate completely
      throw new Error(`Ran into problem getting items from GitHub: \n\n${JSON.stringify(err, null, 2)}`);
    }
  }

  public async latestCommit(owner: string, repo: string, branch: string): Promise<string> {
    const { data } = await this.github.repos.getCommit({
      owner,
      repo,
      ref: branch,
    });

    const { sha } = data;
    if (!sha) {
      throw new Error(`Could not find latest commit for ${owner}/${repo}`);
    }
    return sha;
  }
}
