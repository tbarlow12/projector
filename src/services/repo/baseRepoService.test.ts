import { join } from "path";
import { RepoItem, RepoItemType } from "../../models";
import { FileUtils } from "../../utils";
import { BaseRepoService } from "./baseRepoService";

class MockRepoService extends BaseRepoService {
  getRepoItem: (owner: string, repo: string, path?: string, includeContent?: boolean, branch?: string) => Promise<RepoItem>;
  latestCommit: (owner: string, repo: string, branch: string) => Promise<string>;

  constructor(getRepoItemJestFn: any, latestCommitJestFn: any) {
    super();
    this.getRepoItem = getRepoItemJestFn;
    this.latestCommit = latestCommitJestFn;
  }
}

describe("Base Repo Service", () => {
  const owner = "owner";
  const repo = "repo";
  const path = "path";
  const branch = "branch";
  const repoItemFile: RepoItem = {
    name: "item",
    path: "path",
    type: RepoItemType.File,
    content: "my content",
  };
  const repoItemDirectory: RepoItem = {
    name: "item",
    path: "path",
    type: RepoItemType.Directory,
    children: [
      {
        name: "child 1", 
        path: "path/child 1",
        type: RepoItemType.File,
        content: "content 1",
      },
      {
        name: "child 2", 
        path: "path/child 2",
        type: RepoItemType.File,
        content: "content 2",
      },
      {
        name: "child 3", 
        path: "path/child 3",
        type: RepoItemType.File,
        content: "content 3",
      },
    ],
  };

  beforeEach(() => {
    FileUtils.mkdirIfNotExists = jest.fn();
    FileUtils.writeFile = jest.fn();
  });

  it("downlaods repo file to local directory", async () => {
    // Setup
    const getRepoItemJestFn = jest.fn(() => Promise.resolve(repoItemFile));
    const latestCommitJestFn = jest.fn();
    const service = new MockRepoService(getRepoItemJestFn, latestCommitJestFn);
    const outputPath = "outputPath";

    // Act
    await service.downloadRepoItem(owner, repo, path, branch, outputPath);
    
    // Assert
    expect(getRepoItemJestFn).toBeCalledWith(owner, repo, path, true, branch);
    expect(FileUtils.mkdirIfNotExists).toBeCalledWith(outputPath);
    expect(FileUtils.writeFile).toBeCalledWith(join(outputPath, repoItemFile.name), repoItemFile.content);
  });

  it("downloads repo directory to local directory", async () => {
    // Setup
    const getRepoItemJestFn = jest.fn(() => Promise.resolve(repoItemDirectory));
    const latestCommitJestFn = jest.fn();
    const service = new MockRepoService(getRepoItemJestFn, latestCommitJestFn);
    const outputPath = "outputPath";
    
    // Act
    await service.downloadRepoItem(owner, repo, path, branch, outputPath);
    
    // Assert
    expect(getRepoItemJestFn).toBeCalledWith(owner, repo, path, true, branch);

    const { children, name } = repoItemDirectory;
    expect(children).toBeDefined();
    
    // For TypeScript's benefit
    if (children) {
      expect(children.length).toBeTruthy();
      expect((FileUtils.mkdirIfNotExists as any).mock.calls).toEqual([
        // Called to ensure output path exists
        [outputPath],
        // Called to create repo item directory
        [join(outputPath, name)],
        // Because it is a recursive call, will call to ensure repo directory exists each time
        ...children.map(() => [join(outputPath, name)]),
      ]);
      expect((FileUtils.writeFile as any).mock.calls).toEqual([
        ...children.map((child: RepoItem) => [join(outputPath, name, child.name), child.content]),
      ]);
    }
  });

  it("lists repo items for a repo directory", async () => {
    // Setup
    const getRepoItemJestFn = jest.fn(() => Promise.resolve(repoItemDirectory));
    const latestCommitJestFn = jest.fn();
    const service = new MockRepoService(getRepoItemJestFn, latestCommitJestFn);
    
    // Act
    const result = await service.listRepoItems(owner, repo, path, branch);

    // Assert
    expect(result).toEqual(repoItemDirectory.children);
    expect(getRepoItemJestFn).toBeCalledWith(owner, repo, path, false, branch);
  });

  it("returns an empty array for when listing items for a repo file", async () => {
    // Setup
    const getRepoItemJestFn = jest.fn(() => Promise.resolve(repoItemFile));
    const latestCommitJestFn = jest.fn();
    const service = new MockRepoService(getRepoItemJestFn, latestCommitJestFn);
    
    // Act
    const result = await service.listRepoItems(owner, repo, path, branch);

    // Assert
    expect(result).toEqual([]);
    expect(getRepoItemJestFn).toBeCalledWith(owner, repo, path, false, branch);
  });
});
