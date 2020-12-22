import { GitHubRepoService, RepoServiceProvider } from "../services";
import { RepoServiceFactory } from "./repoServiceFactory";

describe("Repo Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    // Act
    RepoServiceFactory.register(RepoServiceProvider.AzureDevOps, GitHubRepoService);
    
    // Assert
    expect(RepoServiceFactory.get({providerName: RepoServiceProvider.AzureDevOps, providerOptions: {}}))
      .toBeDefined();
  });
});
