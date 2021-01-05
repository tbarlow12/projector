import { AgileConfig, AgileService } from "../models";
import { AgileServiceProvider } from "../services";

export class AgileServiceFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static registry: { [providerName: string]: any } = {};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  public static register(providerName: AgileServiceProvider, service: any): void {
    this.registry[providerName] = service;
  }

  public static get(config?: AgileConfig): AgileService | undefined {
    if (!config) {
      return undefined;
    }

    const { providerName } = config;
    const service = this.registry[providerName];

    if (!service) {
      throw new Error(`Agile service ${providerName} not defined. Options are ${Object.keys(this.registry).join(",")}`);
    }
    return new service(config);
  }
}
