import { BacklogServiceFactory, RepoServiceFactory } from "../factories";
import { BacklogServiceProvider, BaseBacklogService, BaseRepoService, RepoServiceProvider } from "../services";
import { registerProviders } from "./registerProviders";
jest.mock("azure-devops-node-api/WorkItemTrackingApi");

describe("Register Providers", () => {
  beforeAll(() => {
    registerProviders();
  });

  it("registers all backlog providers", () => {
    // Setup
    const providers = [
      BacklogServiceProvider.AzureDevOps
    ];

    providers.forEach((provider: BacklogServiceProvider) => {
      // Act
      const backlogService = BacklogServiceFactory.get({providerName: provider, providerOptions: {}});
      
      // Assert
      expect(backlogService).toBeDefined();
      expect(backlogService).toBeInstanceOf(BaseBacklogService);
    });
  });

  it("registers all repo service providers", () => {
    // Setup
    const providers = [
      RepoServiceProvider.GitHub,
    ];

    providers.forEach((provider: RepoServiceProvider) => {
      // Act
      const repoService = RepoServiceFactory.get({providerName: provider, providerOptions: {}});
      
      // Assert
      expect(repoService).toBeDefined();
      expect(repoService).toBeInstanceOf(BaseRepoService);
    });
  });
});
