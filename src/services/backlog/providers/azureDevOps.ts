import { BacklogItem, Sprint } from "../../../models";
import { BacklogService } from "../backlogService";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi"
import { BacklogConfig } from "../../../models/config/backlog";

export class AzureDevOpsBacklogService implements BacklogService {
  // private work: WorkItemTrackingApi;
  
  constructor(config: BacklogConfig) {
    // const { baseUrl } = config.providerOptions;
    // this.work = new WorkItemTrackingApi(baseUrl, []);
  }

  public async createBacklogItem(item: BacklogItem): Promise<BacklogItem> {
    console.log(`Created backlog item ${JSON.stringify(item, null, 4)}`);
    return item;
  }

  public async createSprint(sprint: Sprint): Promise<Sprint> {
    console.log(`Created backlog item ${JSON.stringify(sprint, null, 4)}`);
    return sprint
  }
}