import { AgileServiceFactory, RepoServiceFactory } from "../factories";
import { AgileServiceProvider, GitHubRepoService, RepoServiceProvider } from "../services";
import { AzureDevOpsAgileService, JiraAgileService } from "../services/agile/providers";

/**
 *
 */
export function registerProviders(): void {
  registerBacklogServiceProviders();
  registerRepoServiceProviders();
}

/**
 *
 */
function registerBacklogServiceProviders() {
  AgileServiceFactory.register(AgileServiceProvider.AzureDevOps, AzureDevOpsAgileService);
  AgileServiceFactory.register(AgileServiceProvider.Jira, JiraAgileService);
}

/**
 *
 */
function registerRepoServiceProviders(): void {
  RepoServiceFactory.register(RepoServiceProvider.GitHub, GitHubRepoService);
}
