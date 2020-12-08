import { BacklogServiceFactory } from "../factories/backlogServiceFactory";
import { AzureDevOpsBacklogService } from "../services/backlog/providers";

export function registerProviders(): void {
  BacklogServiceFactory.register("azdo", AzureDevOpsBacklogService);
}