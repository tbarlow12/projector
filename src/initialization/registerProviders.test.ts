import { BacklogServiceFactory, RepoServiceFactory } from "../factories";
import { BacklogServiceProvider, BaseBacklogService, BaseRepoService, RepoServiceProvider } from "../services";
import { AzureDevOpsProviderOptions } from "../services/backlog/providers";
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

    const azureDevOpsOptions: AzureDevOpsProviderOptions = {
      baseUrl: "https://url.com",
      personalAccessToken: "token",
      projectName: "myproject",
    };

    const options = [
      azureDevOpsOptions
    ];

    providers.forEach((provider: BacklogServiceProvider, index: number) => {
      // Act
      const backlogService = BacklogServiceFactory.get({providerName: provider, providerOptions: options[index]});
      
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
