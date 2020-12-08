import { BacklogServiceFactory } from "../factories/backlogServiceFactory";
import { CseCliConfig } from "../models/config/cliConfig";
import { AzureDevOpsBacklogService } from "../services/backlog/providers";

export function registerProviders(config: CseCliConfig): void {
  const { backlog } = config;
  BacklogServiceFactory.register("azdo", new AzureDevOpsBacklogService(backlog))
}