import { BacklogConfig, BacklogService } from "../models";
import { BacklogServiceProvider } from "../services";

export class BacklogServiceFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static registry: { [providerName: string]: any } = {};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  public static register(providerName: BacklogServiceProvider, service: any): void {
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
