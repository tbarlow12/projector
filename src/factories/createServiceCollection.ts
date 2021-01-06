import { AgileServiceFactory } from "./agileServiceFactory";
import { ProjectorConfig, ServiceCollection } from "../models";
import { GitHubRepoService, CsePlaybookService } from "../services";

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
