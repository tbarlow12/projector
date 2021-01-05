import { AgileServiceFactory } from "./agileServiceFactory";
import { CseCliConfig, ServiceCollection } from "../models";
import { GitHubRepoService, CsePlaybookService } from "../services";

/**
 * Create collection of shared services
 *
 * @param {CseCliConfig} config Configuration object
 * @returns {ServiceCollection} Service Collection
 */
export function createServiceCollection(config: CseCliConfig): ServiceCollection {
  const { github, agile } = config;
  const repoService = new GitHubRepoService(github);

  return {
    agileService: AgileServiceFactory.get(agile),
    repoService,
    playbookService: new CsePlaybookService(repoService),
  };
}
