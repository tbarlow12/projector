import { BacklogConfig } from "../models/config/backlogConfig";
import { BacklogService } from "../services/backlog/backlogService";
import { BacklogServiceProvider } from "../services/backlog/providers";

export class BacklogServiceFactory {
  private static registry: { [providerName: string]: any } = {};

  public static register(providerName: BacklogServiceProvider, service: any) {
    this.registry[providerName] = service;
  }

  public static get(config: BacklogConfig): BacklogService {
    const { providerName } = config;
    const service = this.registry[providerName];

    if (!service) {
      throw new Error(`Backlog service ${providerName} not defined. Options are ${Object.keys(this.registry).join(",")}`);
    }
    return new service(config);
  }
}
