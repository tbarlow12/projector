import { CseCliConfig } from "../../models/config/cliConfig";

export class ConfigService {
  public static createInitialConfig(args: any[]): CseCliConfig {
    return {
      backlog: {
        providerName: "",
        providerOptions: {}
      }
    };
  }
}