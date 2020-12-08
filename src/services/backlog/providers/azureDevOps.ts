import { BacklogItem, Sprint } from "../../../models";
import { BacklogService } from "../backlogService";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi"

export class AzureDevOpsBacklogService implements BacklogService {
  private work: WorkItemTrackingApi;
  
  constructor(baseUrl: string, private project: string) {
    this.work = new WorkItemTrackingApi(baseUrl, []);
  }

  public async createBacklogItem(item: BacklogItem): Promise<BacklogItem> {
    throw new Error("Not yet implemented");
  }

  public async createSprint(sprint: Sprint): Promise<Sprint> {
    throw new Error("Not yet implemented");
  }
}