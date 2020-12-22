import { BacklogServiceFactory, RepoServiceFactory } from "../factories";
import { BacklogServiceProvider, BaseBacklogService, BaseRepoService, RepoServiceProvider } from "../services";
import { registerProviders } from "./registerProviders";
jest.mock("azure-devops-node-api/WorkItemTrackingApi");

describe("Register Providers", () => {
  beforeAll(() => {
    registerProviders();
  });

  it("registers all backlog providers", () => {
    const providers = [
      BacklogServiceProvider.AzureDevOps
    ];
    providers.forEach((provider: BacklogServiceProvider) => {
      const backlogService = BacklogServiceFactory.get({providerName: provider, providerOptions: {}});
      expect(backlogService).toBeDefined();
      expect(backlogService).toBeInstanceOf(BaseBacklogService);
    });
  });

  it("registers all repo service providers", () => {
    const providers = [
      RepoServiceProvider.GitHub,
    ];
    providers.forEach((provider: RepoServiceProvider) => {
      const repoService = RepoServiceFactory.get({providerName: provider, providerOptions: {}});
      expect(repoService).toBeDefined();
      expect(repoService).toBeInstanceOf(BaseRepoService);
    });
  });
});
