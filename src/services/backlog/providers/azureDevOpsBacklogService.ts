import { BacklogItem, Sprint } from "../../../models";
import { BacklogService, BaseBacklogService } from "../backlogService";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi"
import { BacklogConfig } from "../../../models/config/backlogConfig";

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
    console.log(`Created backlog item ${JSON.stringify(item, null, 4)}`);
    return item;
  }

  createSprint = async (sprint: Sprint): Promise<Sprint> => {
    console.log(`Created backlog item ${JSON.stringify(sprint, null, 4)}`);
    return sprint
  }
}