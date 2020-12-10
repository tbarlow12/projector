import { BacklogConfig, RepoService } from "../models";
import { RepoServiceProvider } from "../services";

export class RepoServiceFactory {
  private static registry: { [providerName: string]: any } = {};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static register(providerName: RepoServiceProvider, service: any): void {
    this.registry[providerName] = service;
  }

  public static get(config: BacklogConfig): RepoService {
    const { providerName } = config;
    const service = this.registry[providerName];

    if (!service) {
      throw new Error(`Backlog service ${providerName} not defined. Options are ${Object.keys(this.registry).join(",")}`);
    }
    return new service(config);
  }
}
