import { BacklogService } from "../services/backlog/backlogService";
import { AzureDevOpsBacklogService } from "../services/backlog/providers"

export class BacklogServiceFactory {
  public static getInstance(): BacklogService {
    return new AzureDevOpsBacklogService("baseUrl", "project");
  }
}
