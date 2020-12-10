import { BacklogItem, Sprint } from "../../../models";
import { BacklogConfig } from "../../../models/config/backlogConfig";
import { BaseBacklogService } from "../backlogService";

export interface JiraBacklogConfig extends BacklogConfig {
  providerOptions: {
    baseUrl: string;
  }
} 

export class JiraBacklogService extends BaseBacklogService {
  createBacklogItem = async (item: BacklogItem): Promise<BacklogItem> => {
    console.log(`${this.config.providerName} created backlog item ${JSON.stringify(item, null, 4)}`);
    return item;
  }

  createSprint = async (sprint: Sprint): Promise<Sprint> => {
    console.log(`${this.config.providerName} created sprint ${JSON.stringify(sprint, null, 4)}`);
    return sprint
  }
}
