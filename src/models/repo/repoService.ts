import { RepoItem } from "./repoItem";

export interface RepoService {
  listRepoItems: (owner: string, repo: string, path?: string, branch?: string) => Promise<RepoItem[]>;
  getRepoItem: (
    owner: string,
    repo: string,
    path?: string,
    includeContent?: boolean,
    branch?: string,
  ) => Promise<RepoItem>;
  latestCommit: (owner: string, repo: string, branch: string) => Promise<string>;
  downloadRepoItem: (owner: string, repo: string, path?: string, branch?: string, outputPath?: string) => Promise<void>;
}
