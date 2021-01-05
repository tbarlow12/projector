import { ProjectCreationOptions } from "../../commands/commands/project/commands/init/projectInit";
import { ConfigValue, FileConstants } from "../../constants";
import { AgileConfig, CseCliConfig, GitHubConfig } from "../../models";
import { Config, FileUtils } from "../../utils";
import { AgileServiceProvider } from "../agile";
import { AzureDevOpsProviderOptions } from "../agile/providers";

export interface ConfigOptions {
  configFilePath?: string;
}

/**
 * Class dealing with the CSE configuration.
 * TODO - implement more than just stubs
 */
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
  public static createInitialConfig(options: ProjectCreationOptions): CseCliConfig {
    const { agileProvider } = options;
    return {
      agile: agileProvider ? this.createAgileConfig(agileProvider) : undefined,
      github: this.createGithubConfig(),
    };
  }

  public static getExistingConfig(filePath?: string): CseCliConfig {
    const existingConfig: CseCliConfig = FileUtils.readJson(filePath || FileConstants.configFileName);

    if (!existingConfig) {
      throw new Error(
        "Config undefined. Make sure you have a cse.json configuration file within " +
          "your current working directory. Run `cse project init` if you don't have one",
      );
    }

    return existingConfig;
  }

  private static createAgileConfig(provider: AgileServiceProvider): AgileConfig {
    const now = new Date();
    return {
      providerName: provider,
      providerOptions: this.getProviderOptions(provider),
      sprints: {
        startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        lengthOfSprintInDays: Config.getValue(ConfigValue.DefaultSprintLength),
        daysBetweenSprints: Config.getValue(ConfigValue.DefaultDaysBetweenSprints),
        numberOfSprints: Config.getValue(ConfigValue.DefaultNumberOfSprints),
        sprintIndexStart: Config.getValue(ConfigValue.DefaultSprintStartIndex),
        sprintNamePattern: Config.getValue(ConfigValue.DefaultSprintNamePattern),
      },
    };
  }

  private static createGithubConfig(): GitHubConfig {
    return {
      personalAccessToken: "{Not required, but allows for greater API limit when reading from GitHub repos}",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getProviderOptions(provider: AgileServiceProvider): any {
    switch (provider) {
      case AgileServiceProvider.AzureDevOps:
      default:
        const azDoProviderOptions: AzureDevOpsProviderOptions = {
          baseUrl: "{Base URL for Azure DevOps organization}",
          projectName: "{Name of Azure DevOps project}",
          personalAccessToken: "{Go to 'https://dev.azure.com/{organization}/_usersSettings/tokens' to generate token}",
        };
        return azDoProviderOptions;
    }
  }
}
