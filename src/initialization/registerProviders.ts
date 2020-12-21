import { BacklogServiceFactory, RepoServiceFactory } from "../factories";
import { BacklogServiceProvider, GitHubRepoService, RepoServiceProvider } from "../services";
import { AzureDevOpsBacklogService, JiraBacklogService } from "../services/backlog/providers";

export function registerProviders(): void {
  registerBacklogServiceProviders();
  registerRepoServiceProviders();
}

function registerBacklogServiceProviders() {
  BacklogServiceFactory.register(BacklogServiceProvider.AzureDevOps, AzureDevOpsBacklogService);
  BacklogServiceFactory.register(BacklogServiceProvider.Jira, JiraBacklogService);
}

function registerRepoServiceProviders(): void {
  RepoServiceFactory.register(RepoServiceProvider.GitHub, GitHubRepoService);
}
