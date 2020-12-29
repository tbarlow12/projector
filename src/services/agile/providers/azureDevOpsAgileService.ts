import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { TeamContext } from "azure-devops-node-api/interfaces/CoreInterfaces";
import { TreeStructureGroup } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { ConfigValue } from "../../../constants";
import { BacklogItem, Project, Sprint } from "../../../models";
import { AgileConfig } from "../../../models/config/agile/agileConfig";
import { Config, Guard, retryAsync } from "../../../utils";
import { BaseAgileService } from "../baseAgileService";

export interface AzureDevOpsProviderOptions {
  baseUrl: string;
  projectName: string;
  personalAccessToken: string;
}
export interface AzureDevOpsBacklogConfig extends AgileConfig {
  providerOptions: AzureDevOpsProviderOptions;
} 

export class AzureDevOpsAgileService extends BaseAgileService {
  /* Name of Azure DevOps Project */
  private projectName: string;
  /* Work Item Tracking API */
  private workItemTracking: WorkItemTrackingApi;
  /* Work API */
  private workApi: WorkApi;
  /* Core API */
  private coreApi: CoreApi;
  /* Team Context */
  private teamContext?: TeamContext;

  constructor(config: AzureDevOpsBacklogConfig) {
    super(config);
    
    const { providerOptions } = config;


    const projectName = Config.getValueWithDefault(ConfigValue.AzDOProjectName, providerOptions.projectName);
    if (!projectName) {
      throw new Error("Need to configure an AzDO project name in config file or environment variable");
    }

    this.projectName = projectName;

    const personalAccessToken = Config.getValueWithDefault(ConfigValue.AzDOAccessToken, providerOptions.personalAccessToken);
    if (!personalAccessToken) {
      throw new Error("Need to configure an AzDO personal access token in config file or environment variable");
    }

    const baseUrl = Config.getValueWithDefault(ConfigValue.AzDOBaseUrl, providerOptions.baseUrl);
    if (!baseUrl) {
      throw new Error("Need to configure an AzDO base URL in config file or environment variable");
    }

    // Instantiate auth handler to be used in API clients
    const authHandler = getPersonalAccessTokenHandler(personalAccessToken);
    
    // Instantiate various API clients
    this.coreApi = new CoreApi(baseUrl, [authHandler]);
    this.workItemTracking = new WorkItemTrackingApi(baseUrl, [authHandler]);
    this.workApi = new WorkApi(baseUrl, [authHandler]);
  }

  // Projects

  createProject = async (): Promise<Project> => {
    throw new Error("Not implemented");
  }

  // Backlog Items

  createProviderBacklogItems = async (items: BacklogItem[]): Promise<BacklogItem[]> => {
    // await this.workItemTracking.createWorkItem()
    return items;
  }

  // Sprints

  getSprint = async (id: string): Promise<Sprint> => {
    const teamContext = await this.getTeamContext();
    const teamIteration = await retryAsync(() => this.workApi.getTeamIteration(teamContext, id));

    if (!teamIteration) {
      throw new Error(`Could not retrieve sprint ${id}`);
    }

    const { name, attributes } = teamIteration;

    return {
      id,
      name: name || "",
      startDate: attributes?.startDate, 
      finishDate: attributes?.finishDate,
    };
  }

  createProviderSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    const teamContext = await this.getTeamContext();

    console.log(`Creating ${sprints.length} sprints`);

    const createdSprints: Sprint[] = [];

    for (const sprint of sprints) {
      createdSprints.push(await this.createProviderSprint(sprint, teamContext));
    }
    return sprints;
  }

  deleteSprint = async (id: string): Promise<void> => {
    const teamContext = await this.getTeamContext();
    await this.workApi.deleteTeamIteration(teamContext, id);
  }

  // Private functions

  private async createProviderSprint(sprint: Sprint, teamContext: TeamContext): Promise<Sprint> {
    const { name, startDate, finishDate } = sprint;
    
    // Creates classification node and returns identifier required for sprint ID
    const identifier = await this.createOrUpdateClassificationNode(sprint, teamContext);

    // Create new iteration
    const result = await this.workApi.postTeamIteration({
      id: identifier,
      name,
      attributes: {
        startDate,
        finishDate,
      },
    }, teamContext);

    // Assign generated ID from Azure DevOps to sprint
    sprint.id = result.id;
    console.log(`Sprint '${name}' created`);
    return sprint;
  }

  private async createOrUpdateClassificationNode(sprint: Sprint, teamContext: TeamContext): Promise<string> {
    const { name, startDate, finishDate } = sprint;
    Guard.empty(name);

    await this.deleteNodeAndIterationIfExists(name, teamContext);
    
    const { identifier } = await this.workItemTracking.createOrUpdateClassificationNode({
      name,
      attributes: {
        startDate: startDate?.toISOString(),
        finishDate: finishDate?.toISOString(),
      }
    }, this.projectName, TreeStructureGroup.Iterations);

    if (!identifier) {
      throw new Error(`Was not able to retrieve identifier for ${this.projectName}`);
    }
    return identifier;
  }

  private async deleteNodeAndIterationIfExists(name: string, teamContext: TeamContext) {
    const node = await this.workItemTracking.getClassificationNode(this.projectName, TreeStructureGroup.Iterations, name);
    if (node && node.identifier) {
      await this.workApi.deleteTeamIteration(teamContext, node.identifier);
      await this.workItemTracking.deleteClassificationNode(this.projectName, TreeStructureGroup.Iterations, name);
    }
  }

  private async getTeamContext(): Promise<TeamContext> {
    if (this.teamContext) {
      return this.teamContext;
    }
    const {
      name,
      id,
      defaultTeam
    } = await this.coreApi.getProject(this.projectName);

    this.teamContext = {
      project: name,
      projectId: id,
      team: defaultTeam?.name,
      teamId: defaultTeam?.id,
    };
    return this.teamContext;
  }
}
