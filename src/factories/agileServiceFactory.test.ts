import { AgileServiceProvider } from "../services";
import { AzureDevOpsAgileService, AzureDevOpsProviderOptions } from "../services/agile/providers";
import { AgileServiceFactory } from "./agileServiceFactory";
jest.mock("azure-devops-node-api/WorkItemTrackingApi");

describe("Backlog Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    // Act
    AgileServiceFactory.register(AgileServiceProvider.AzureDevOps, AzureDevOpsAgileService);

    // Assert
    const providerOptions: AzureDevOpsProviderOptions = {
      baseUrl: "https://url.com",
      personalAccessToken: "token",
      projectName: "myproject",
    };
    expect(AgileServiceFactory.get({ providerName: AgileServiceProvider.AzureDevOps, providerOptions })).toBeDefined();
  });
});
