import { AgileServiceFactory } from "./agileServiceFactory";
import {
  BacklogItemTemplate,
  ProjectorConfig,
  RepoItem,
  ServiceCollection,
  StorageService,
  TemplateItem,
} from "../models";
import { GitHubRepoService, GithubPlaybookService } from "../services";
import { join } from "path";
import { StorageServiceFactory, StorageType } from "./storageServiceFactory";
import { registerProviders } from "../initialization";
import { PlaybookServiceFactory } from "./playbookServiceFactory";

/**
 * Create collection of shared services
 *
 * @param {ProjectorConfig} config Configuration object
 * @param {StorageService<ProjectorConfig>} configStorageService The service which fetched the config in case we have to write to it.
 * @returns {ServiceCollection} Service Collection
 */
export function createServiceCollection(
  config: ProjectorConfig,
  configStorageService: StorageService<ProjectorConfig>,
): ServiceCollection {
  const { github, agile } = config;

  registerProviders();

  // TODO: These should be configurable
  const backlogItemLocation = join(process.cwd(), ".projector", "backlogItems");

  const backlogItemStorageService = StorageServiceFactory.get<BacklogItemTemplate>(
    StorageType.FILE,
    backlogItemLocation,
  );
  const templateStorageService = StorageServiceFactory.get<TemplateItem>(StorageType.FILE);
  const repoStorageService = StorageServiceFactory.get<RepoItem>(StorageType.FILE);
  const repoService = new GitHubRepoService(repoStorageService, github);
  const playbookService = PlaybookServiceFactory.get(repoService);

  return {
    agileService: AgileServiceFactory.get(agile),
    backlogItemStorageService,
    configStorageService,
    templateStorageService,
    repoService,
    playbookService,
  };
}
