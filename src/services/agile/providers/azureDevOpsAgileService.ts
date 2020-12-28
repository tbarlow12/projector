import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { TeamContext } from "azure-devops-node-api/interfaces/CoreInterfaces";
import { TreeStructureGroup } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { BacklogItem, Project, Sprint } from "../../../models";
import { AgileConfig } from "../../../models/config/agile/agileConfig";
import { Guard, retryAsync } from "../../../utils";
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

  // Projects

  createProject = async (project: Project): Promise<Project> => {
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

    return await Promise.all(sprints.map((sprint: Sprint) => {
      return this.createProviderSprint(sprint, teamContext);
    }));
  }

  deleteSprint = async (id: string): Promise<void> => {
    const teamContext = await this.getTeamContext();
    await this.workApi.deleteTeamIteration(teamContext, id);
  }

  // Private functions

  private async createProviderSprint(sprint: Sprint, teamContext: TeamContext): Promise<Sprint> {
    const { name, startDate, finishDate } = sprint;
    console.log(`Creating sprint '${name}'`);

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
