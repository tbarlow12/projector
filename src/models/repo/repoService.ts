import { RepoItem } from "./repoItem";

export interface RepoService {
  repos: (owner: string) => Promise<string[]>;
  ls: (owner: string, repo: string, path?: string) => Promise<RepoItem[]>;
  content: (owner: string, repo: string, path: string) => Promise<string>;
  latestCommit: (owner: string, repo: string, branch: string) => Promise<string>;
}
