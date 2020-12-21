import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { BacklogItem, Sprint } from "../../../models";
import { BacklogConfig } from "../../../models/config/backlogConfig";
import { BaseBacklogService } from "../backlogService";

export interface AzureDevOpsBacklogConfig extends BacklogConfig {
  providerOptions: {
    baseUrl: string;
    projectName: string;
  }
} 

export class AzureDevOpsBacklogService extends BaseBacklogService {
  private workItemTracking: WorkItemTrackingApi;

  constructor(config: AzureDevOpsBacklogConfig) {
    super(config);
    const { baseUrl } = config.providerOptions;
    this.workItemTracking = new WorkItemTrackingApi(baseUrl, []);
  }

  createBacklogItem = async (item: BacklogItem): Promise<BacklogItem> => {
    console.log(`${this.config.providerName} created backlog item ${JSON.stringify(item, null, 4)}`);
    return item;
  }

  createSprint = async (sprint: Sprint): Promise<Sprint> => {
    console.log(`${this.config.providerName} created sprint ${JSON.stringify(sprint, null, 4)}`);
    return sprint
  }
}
