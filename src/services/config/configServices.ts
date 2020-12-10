import { CseCliConfig } from "../../models/config/cliConfig";

export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types 
  public static createInitialConfig(options: any): CseCliConfig {
    return {
      backlog: {
        providerName: "",
        providerOptions: {}
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static createFromArgs(options: { [name: string]: string }): CseCliConfig {
    return {
      backlog: {
        providerName: "azdo",
        providerOptions: {}
      }
    };
  }
}
