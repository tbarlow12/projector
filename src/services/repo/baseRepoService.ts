import { join } from "path";
import { RepoItem, RepoItemType, RepoService } from "../../models";
import { FileUtils } from "../../utils";

export abstract class BaseRepoService implements RepoService {
  // Base functions

  public async downloadRepoItem(
    owner: string,
    repo: string,
    path?: string,
    branch?: string,
    outputPath: string = process.cwd(),
  ): Promise<void> {
    const repoItem = await this.getRepoItem(owner, repo, path, true, branch);
    await this.writeRepoItem(repoItem, outputPath);
  }

  public async listRepoItems(owner: string, repo: string, path = "", branch?: string): Promise<RepoItem[]> {
    const repoItem = await this.getRepoItem(owner, repo, path, false, branch);
    const { type, children } = repoItem;
    return type === RepoItemType.Directory && children ? children : [];
  }

  // Abstract functions

  abstract getRepoItem: (
    owner: string,
    repo: string,
    path?: string,
    includeContent?: boolean,
    branch?: string,
  ) => Promise<RepoItem>;
  abstract latestCommit: (owner: string, repo: string, branch: string) => Promise<string>;

  // Private functions

  private async writeRepoItem(repoItem: RepoItem, outputPath: string): Promise<void> {
    const { content, children, name, type } = repoItem;

    await FileUtils.mkdirIfNotExists(outputPath);

    const repoItemPath = join(outputPath, name);

    if (type === RepoItemType.Directory) {
      await FileUtils.mkdirIfNotExists(repoItemPath);
      if (children) {
        await Promise.all(children.map((item: RepoItem) => this.writeRepoItem(item, repoItemPath)));
      }
    } else if (content) {
      await FileUtils.writeFile(repoItemPath, content);
    }
  }
}
