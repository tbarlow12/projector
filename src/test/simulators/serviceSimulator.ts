import { RepoService } from "../../models";

export class ServiceSimulator {
  public static createTestRepoService(): RepoService {
    return {
      latestCommit: jest.fn(),
      listRepoItems: jest.fn(),
      getRepoItem: jest.fn(),
      downloadRepoItem: jest.fn(),
    };
  }
}
