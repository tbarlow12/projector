import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { TeamContext } from "azure-devops-node-api/interfaces/CoreInterfaces";
import { TreeStructureGroup } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { BacklogItem, Project, Sprint } from "../../../models";
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
      name,
      startDate: attributes?.startDate, 
      finishDate: attributes?.finishDate,
    };
  }

  createProviderSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    const createdSprints: Sprint[] = [];
    for (const s of sprints) {
      createdSprints.push(await this.createProviderSprint(s));
    }
    return createdSprints
  }

  deleteSprint = async (id: string): Promise<void> => {
    const teamContext = await this.getTeamContext();
    await this.workApi.deleteTeamIteration(teamContext, id);
  }

  // Private functions

  private async createProviderSprint(sprint: Sprint): Promise<Sprint> {
    const teamContext = await this.getTeamContext();

    // Creates classification node and returns identifier required for sprint ID
    const identifier = await this.createClassificationNode(sprint);

    // Check to see if iteration exists - delete if so
    const iteration = await this.workApi.getTeamIteration(teamContext, identifier);
    if (iteration && iteration.id) {
      console.warn(JSON.stringify(iteration, null, 4));
      await this.workApi.deleteTeamIteration(teamContext, iteration.id)
    }

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
  }

  private async createClassificationNode(sprint: Sprint): Promise<string> {
    const teamContext = await this.getTeamContext();
    const { name, startDate, finishDate } = sprint;
    const node = await this.workItemTracking.getClassificationNode(this.projectName, TreeStructureGroup.Iterations, name);
    if (node && node.identifier) {
      console.warn(`Deleting identifier: ${node.identifier} ${name}`);
      await this.workApi.deleteTeamIteration(teamContext, node.identifier);
      console.warn(`Deleted identifier ${node.identifier}`);
      await this.workItemTracking.deleteClassificationNode(this.projectName, TreeStructureGroup.Iterations, name);
      console.warn(`Deleted classification node ${node.identifier}`);
    }
    console.warn("Creating classificaiton node");
    const { identifier } = await this.workItemTracking.createOrUpdateClassificationNode({
      name,
      attributes: {
        startDate: startDate?.toISOString(),
        finishDate: finishDate?.toISOString(),
      }
    }, this.projectName, TreeStructureGroup.Iterations);
    console.warn("Created classification node")
    if (!identifier) {
      throw new Error(`Was not able to retrieve identifier for ${this.projectName}`);
    }
    console.log(identifier);
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
