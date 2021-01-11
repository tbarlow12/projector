import { ProjectorConfig, ServiceCollection } from "../models";
import { CsePlaybookService, GitHubRepoService } from "../services";
import { AgileServiceFactory } from "./agileServiceFactory";

/**
 * Create collection of shared services
 *
 * @param {ProjectorConfig} config Configuration object
 * @returns {ServiceCollection} Service Collection
 */
export function createServiceCollection(config: ProjectorConfig): ServiceCollection {
  const { github, agile } = config;
  const repoService = new GitHubRepoService(github);

  return {
    agileService: AgileServiceFactory.get(agile),
    repoService,
    playbookService: new CsePlaybookService(repoService),
  };
}
