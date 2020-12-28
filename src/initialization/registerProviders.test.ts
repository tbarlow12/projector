import { AgileServiceFactory, RepoServiceFactory } from "../factories";
import { AgileServiceProvider, BaseAgileService, BaseRepoService, RepoServiceProvider } from "../services";
import { AzureDevOpsProviderOptions } from "../services/agile/providers";
import { registerProviders } from "./registerProviders";
jest.mock("azure-devops-node-api/WorkItemTrackingApi");

describe("Register Providers", () => {
  beforeAll(() => {
    registerProviders();
  });

  it("registers all agile providers", () => {
    // Setup
    const providers = [
      AgileServiceProvider.AzureDevOps
    ];

    const azureDevOpsOptions: AzureDevOpsProviderOptions = {
      baseUrl: "https://url.com",
      personalAccessToken: "token",
      projectName: "myproject",
    };

    const options = [
      azureDevOpsOptions
    ];

    providers.forEach((provider: AgileServiceProvider, index: number) => {
      // Act
      const agileService = AgileServiceFactory.get({providerName: provider, providerOptions: options[index]});
      
      // Assert
      expect(agileService).toBeDefined();
      expect(agileService).toBeInstanceOf(BaseAgileService);
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
