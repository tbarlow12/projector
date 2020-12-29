import { AgileConfig, BacklogItem, Project, Sprint } from "../../../../models";
import { BaseAgileService } from "../../baseAgileService";

export interface JiraAgileConfig extends AgileConfig {
  providerOptions: {
    baseUrl: string;
  }
} 

export class JiraAgileService extends BaseAgileService {
  createProject = async (): Promise<Project> => {
    throw new Error("Not implemented");
  }
  
  createProviderBacklogItems = async (items: BacklogItem[]): Promise<BacklogItem[]> => {
    console.log(`${this.config.providerName} created backlog item ${JSON.stringify(items, null, 4)}`);
    return items;
  }

  createProviderSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    console.log(`${this.config.providerName} created sprint ${JSON.stringify(sprints, null, 4)}`);
    return sprints;
  }

  getSprint = async (): Promise<Sprint> => {
    throw new Error("Not implemented");
  }

  deleteSprint = async (): Promise<void> => {
    throw new Error("Not implemented");
  }
}
