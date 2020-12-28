import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { TeamContext } from "azure-devops-node-api/interfaces/CoreInterfaces";
import { TreeStructureGroup } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { BacklogItem, Sprint } from "../../../models";
import { AgileConfig } from "../../../models/config/agile/agileConfig";
import { retryAsync } from "../../../utils";
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
  private projectName: string;
  private workItemTracking: WorkItemTrackingApi;
  private workApi: WorkApi;
  private coreApi: CoreApi;
  private teamContext?: TeamContext;

  constructor(config: AzureDevOpsBacklogConfig) {
    super(config);
    
    const { baseUrl, personalAccessToken, projectName } = config.providerOptions;
    const authHandler = getPersonalAccessTokenHandler(personalAccessToken);
    
    this.projectName = projectName;
    this.coreApi = new CoreApi(baseUrl, [authHandler]);
    this.workItemTracking = new WorkItemTrackingApi(baseUrl, [authHandler]);
    this.workApi = new WorkApi(baseUrl, [authHandler]);
  }

  getSprint = async (id: string): Promise<Sprint> => {
    const teamContext = await this.getTeamContext();
    const teamIteration = await retryAsync(() => this.workApi.getTeamIteration(teamContext, id));

    if (!teamIteration) {
      throw new Error(`Could not retrieve sprint ${id}`);
    }

    const { name, attributes } = teamIteration;

    return {
      id,
      name,
      startDate: attributes?.startDate, 
      finishDate: attributes?.finishDate,
    };
  }

  createProviderBacklogItems = async (items: BacklogItem[]): Promise<BacklogItem[]> => {
    // await this.workItemTracking.createWorkItem()
    return items;
  }

  createProviderSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    const teamContext = await this.getTeamContext();

    return Promise.all(sprints.map(async (sprint: Sprint) => {
      // Creates classification node and returns identifier required for sprint ID
      const identifier = await this.createClassificationNode(sprint);

      const { name, startDate, finishDate } = sprint;

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
      return sprint;
    }));
  }

  deleteSprint = async (id: string): Promise<void> => {
    const teamContext = await this.getTeamContext();
    await this.workApi.deleteTeamIteration(teamContext, id);
  }

  private async createClassificationNode(sprint: Sprint): Promise<string> {
    const { name, startDate, finishDate } = sprint;
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
