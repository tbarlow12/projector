import { ConfigValue, FileConstants } from "../../constants";
import { BacklogConfig, CseCliConfig, GitHubConfig } from "../../models";
import { Config, FileUtils } from "../../utils";
import { BacklogServiceProvider } from "../backlog";
import { AzureDevOpsProviderOptions } from "../backlog/providers";

export interface ConfigOptions {
  configFilePath?: string;
}

export interface ConfigInitializationOptions {
  backlogProvider?: BacklogServiceProvider;
}

/**
 * Class dealing with the CSE configuration.
 * TODO - implement more than just stubs
 */
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types 
  public static createInitialConfig(options: ConfigInitializationOptions): CseCliConfig {
    const { backlogProvider } = options;
    return {
      backlog: backlogProvider ? this.createBacklogConfig(backlogProvider) : undefined,
      github: this.createGithubConfig()
    };
  }

  public static createConfig(options: ConfigOptions): CseCliConfig {
    const { configFilePath } = options;
    const existingConfig: CseCliConfig = FileUtils.readJson(configFilePath || FileConstants.configFileName);
    return existingConfig;
  }

  private static createBacklogConfig(provider: BacklogServiceProvider): BacklogConfig {
    const now = new Date();
    return {
      providerName: provider,
      providerOptions: this.getProviderOptions(provider),
      sprints: {
        startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        lengthOfSprintInDays: Config.getValue(ConfigValue.DefaultSprintLength),
        numberOfSprints: Config.getValue(ConfigValue.DefaultNumberOfSprints),
      }
    };
  }

  private static createGithubConfig(): GitHubConfig {
    return {
      personalAccessToken: "{Not required, but allows for greater API limit when reading from GitHub repos}",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getProviderOptions(provider: BacklogServiceProvider): any {
    switch (provider) {
      case BacklogServiceProvider.AzureDevOps:
      default:
        const azDoProviderOptions: AzureDevOpsProviderOptions = {
          baseUrl: "{Base URL for Azure DevOps organization}",
          projectName: "{Name of Azure DevOps project}",
          personalAccessToken: "{Go to 'https://dev.azure.com/{organization}/_usersSettings/tokens' to generate token}"
        };
        return azDoProviderOptions;
    }
  }
}
