import { Octokit } from "@octokit/rest";
import axios from "axios";
import { basename } from "path";
import { ConfigValue } from "../../../constants";
import { RepoItem, RepoItemType } from "../../../models";
import { Config } from "../../../utils";
import { BaseRepoService } from "../baseRepoService";

export class GitHubRepoService extends BaseRepoService {
  private github: Octokit;

  constructor() {
    super();
    const accessToken = Config.getValueWithDefault(ConfigValue.GithubAccessToken);
    this.github = new Octokit({
      userAgent: "cse-cli",
      auth: accessToken,
    });
  }

  getRepoItem = async (owner: string, repo: string, path = "", includeContent?: boolean, branch?: string): Promise<RepoItem> => {
    try {
      const { data } = await this.github.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      if (data instanceof Array) {
        const children: RepoItem[] = await Promise.all((data as any[]).map(async (item) => {
          return await this.getRepoItem(owner, repo, item.path, includeContent);
        }));
        return {
          name: basename(path),
          type: RepoItemType.Directory,
          path,
          children,
        }
      } else {
        const { download_url } = data as any;
        return {
          name: basename(path),
          type: RepoItemType.File,
          path,
          content: includeContent ? (await axios.get(download_url)).data : undefined,
        }
      }
    } catch (err) {
      const { status } = err;
      if (status && status === 403) {
        const message = "API rate limit exceeded. Try setting GITHUB_TOKEN in your local .env file with a token from GitHub";
        throw new Error(message);
      } else {
        throw new Error(`Ran into problem getting items from GitHub: \n\n${JSON.stringify(err, null, 2)}`)
      }
    }
  }



  latestCommit = async (owner: string, repo: string, branch: string): Promise<string> => {
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
