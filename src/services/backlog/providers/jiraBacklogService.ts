import { BacklogItem, ProviderConfig, Sprint } from "../../../models";
import { BaseBacklogService } from "../baseBacklogService";

export interface JiraBacklogConfig extends ProviderConfig {
  providerOptions: {
    baseUrl: string;
  }
} 

export class JiraBacklogService extends BaseBacklogService {
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
