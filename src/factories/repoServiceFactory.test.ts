import { GitHubRepoService, RepoServiceProvider } from "../services";
import { RepoServiceFactory } from "./repoServiceFactory";

describe("Repo Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    RepoServiceFactory.register(RepoServiceProvider.AzureDevOps, GitHubRepoService);
    expect(RepoServiceFactory.get({providerName: RepoServiceProvider.AzureDevOps, providerOptions: {}}))
      .toBeDefined();
  });
});
