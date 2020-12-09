import { BacklogServiceFactory } from "../factories/backlogServiceFactory";
import { AzureDevOpsBacklogService, BacklogServiceProvider, JiraBacklogService } from "../services/backlog/providers";

export function registerProviders(): void {
  registerBacklogServiceProviders();
}

function registerBacklogServiceProviders() {
  BacklogServiceFactory.register(BacklogServiceProvider.AzureDevOps, AzureDevOpsBacklogService);
  BacklogServiceFactory.register(BacklogServiceProvider.Jira, JiraBacklogService);
}