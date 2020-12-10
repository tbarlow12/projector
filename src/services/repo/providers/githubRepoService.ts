import { Octokit } from "@octokit/rest";
import { ConfigValue } from "../../../constants";
import { RepoItem, RepoItemType, RepoService } from "../../../models";
import { Config } from "../../../utils";
import axios from "axios"

export class GitHubRepoService implements RepoService {
  private github: Octokit;

  constructor() {
    const accessToken = Config.getValue(ConfigValue.GithubAccessToken);
    this.github = new Octokit({
      userAgent: "cse-cli",
      auth: accessToken,
    });
  }

  public async repos(owner: string): Promise<string[]> {
    const { data, status } = await this.github.repos.listForOrg({
      org: owner,
      type: "public",
    });
    if (status !== 200) {
      throw new Error(`Error retrieving repos: ${status}`);
    }
    return data.map(item => item.name);
  }

  public async ls(owner: string, repo: string, path = "", branch?: string): Promise<RepoItem[]> {
    const content = await this.github.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    const data = content.data as any[];
    return data.map(item => {
      const { name, type, path } = item;
      return {
        type: (type === "dir") ? RepoItemType.Directory : RepoItemType.File,
        name,
        path,
      }
    })
  }

  public async content(owner: string, repo: string, path: string, branch?: string): Promise<string> {
    const { data } = await this.github.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    const { download_url } = data as any;
    const content = await axios.get(download_url);
    return content.data;
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
