import { AgileConfig, BacklogItem, Project, Sprint } from "../../../../models";
import { BaseAgileService } from "../../baseAgileService";

export interface JiraAgileConfig extends AgileConfig {
  providerOptions: {
    baseUrl: string;
  };
}

export class JiraAgileService extends BaseAgileService {
  createProject = async (): Promise<Project> => {
    throw new Error("Not implemented");
  };

  getBacklogItems = (): Promise<BacklogItem[]> => {
    throw new Error("Not implemented");
  };

  createBacklogItems = (): Promise<BacklogItem[]> => {
    throw new Error("Not implemented");
  };

  deleteBacklogItems = (): Promise<void> => {
    throw new Error("Not implemented");
  };

  createProviderSprints = (): Promise<Sprint[]> => {
    throw new Error("Not implemented");
  };

  getSprint = (): Promise<Sprint> => {
    throw new Error("Not implemented");
  };

  deleteSprint = (): Promise<void> => {
    throw new Error("Not implemented");
  };
}
