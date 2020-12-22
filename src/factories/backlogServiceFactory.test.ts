import { BacklogServiceProvider } from "../services";
import { AzureDevOpsBacklogService } from "../services/backlog/providers";
import { BacklogServiceFactory } from "./backlogServiceFactory";
jest.mock("azure-devops-node-api/WorkItemTrackingApi");

describe("Backlog Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    BacklogServiceFactory.register(BacklogServiceProvider.AzureDevOps, AzureDevOpsBacklogService);
    expect(BacklogServiceFactory.get({providerName: BacklogServiceProvider.AzureDevOps, providerOptions: {}}))
      .toBeDefined();
  });
});
