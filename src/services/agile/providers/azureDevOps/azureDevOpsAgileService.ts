import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { TeamContext } from "azure-devops-node-api/interfaces/CoreInterfaces";
import { TreeStructureGroup, WorkItem, WorkItemExpand } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { ConfigValue } from "../../../../constants";
import { BacklogItem, Project, Sprint } from "../../../../models";
import { AgileConfig } from "../../../../models/config/agile/agileConfig";
import { Config, Guard, retryAsync } from "../../../../utils";
import { BaseAgileService } from "../../baseAgileService";
import { AzureDevOpsUtils } from "./azureDevOpsUtils";
import { AzureDevOpsWorkItemField } from "./azureDevOpsWorkItemField";
import { AzureDevOpsWorkItemType } from "./azureDevOpsWorkItemType";

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

    const personalAccessToken = Config.getRequiredValueWithDefault(
      ConfigValue.AzDOAccessToken,
      providerOptions.personalAccessToken,
      "Need to configure an AzDO personal access token in config file or environment variable");

    const baseUrl = Config.getRequiredValueWithDefault(
      ConfigValue.AzDOBaseUrl,
      providerOptions.baseUrl,
      "Need to configure an AzDO base URL in config file or environment variable");

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

  /**
   * Get backlog items from provider
   * 
   * @param {string[]} ids IDs for the backlog items to retrieve
   * @param {boolean|undefined} includeChildren Indicates whether or not to include child backlog items
   * @returns {BacklogItem[]} Backlog items
   */
  getBacklogItems = async (ids: string[], includeChildren = false): Promise<BacklogItem[]> => {
    const workItems = await this.workItemTracking.getWorkItems(ids.map(id => +id), undefined, undefined, WorkItemExpand.Relations);
    return await Promise.all(workItems.map((workItem: WorkItem) => this.mapWorkItem(workItem, includeChildren)));
  }

  /**
   * Create backlog items
   * 
   * @param {BacklogItem[]} items Backlog items to create 
   * @param {BacklogItem|undefined} parent Parent item of backlog items to create if exists
   * @returns {BacklogItem[]} Newly created backlog items 
   */
  createProviderBacklogItems = async (items: BacklogItem[], parent?: BacklogItem): Promise<BacklogItem[]> => {
    const backlogItems: BacklogItem[] = [];
    
    // Currently creating backlog items in sequence as we were seeing intermittent failures
    // with asynchronous creation
    
    for (const item of items) {
      // Make API call to create work item
      const workItem = await this.workItemTracking.createWorkItem(
        undefined,
        AzureDevOpsUtils.createPatchDocument(item, parent?.url),
        this.projectName,
        AzureDevOpsUtils.getWorkItemType(item.type));
      
      // Map work item from AzDO work item to standardized backlog item
      const createdBacklogItem = await this.mapWorkItem(workItem);
      
      // Create children if backlog item has children
      if (item.children) {
        createdBacklogItem.children = await this.createProviderBacklogItems(item.children, createdBacklogItem);
      }

      // Add newly created work item to list
      backlogItems.push(createdBacklogItem);
    }
    return backlogItems;
  }

  /**
   * Delete backlog items from provider
   * 
   * @param {string[]} ids IDs for the backlog items to delete
   * @param {boolean|undefined} includeChildren Indicates whether or not to delete child backlog items
   */
  deleteBacklogItems = async (ids: string[], includeChildren = true): Promise<void> => {
    if (includeChildren) {
      const parents = await this.getBacklogItems(ids, true);
      for (const parent of parents) {
        const { children } = parent;

        if (!children) {
          continue;
        }

        await this.deleteBacklogItems(children.map(child => child.id!), includeChildren);
      }
    }
    await Promise.all(ids.map(id => this.workItemTracking.deleteWorkItem(+id, this.projectName)));
  }

  // Sprints

  /**
   * Get a sprint by ID
   * 
   * @param {string} id Sprint ID
   * @returns {Sprint} Sprint
   */
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

  /**
   * Create sprints
   * 
   * @param {Sprint[]} sprints Sprints to create
   * @returns {Promise<Sprint[]>} Newly created sprints
   */
  createProviderSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    const teamContext = await this.getTeamContext();

    console.log(`Creating ${sprints.length} sprints`);

    const createdSprints: Sprint[] = [];

    for (const sprint of sprints) {
      createdSprints.push(await this.createProviderSprint(sprint, teamContext));
    }
    return sprints;
  }

  /**
   * Delete a sprint
   * 
   * @param {string} id Sprint ID
   */
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

  private async mapWorkItem(workItem: WorkItem, includeChildren = false): Promise<BacklogItem> {
    const { id, fields, url } = workItem;
    const workItemType: AzureDevOpsWorkItemType = fields![AzureDevOpsWorkItemField.Type];    
    const name: string = fields![AzureDevOpsWorkItemField.Name];
    const description: string|undefined = fields![AzureDevOpsWorkItemField.Description];
    const acceptanceCriteria: string|undefined = fields![AzureDevOpsWorkItemField.AcceptanceCriteria];

    return {
      id: id!.toString(),
      name,
      type: AzureDevOpsUtils.getBacklogItemType(workItemType),
      children: includeChildren ? await this.getBacklogItemChildren(workItem) : undefined,
      url,
      description: description ? description.replace("<div>", "").replace("</div>", "") : undefined,
      acceptanceCriteria,
    };
  }

  private async getBacklogItemChildren(workItem: WorkItem): Promise<BacklogItem[]|undefined> {
    const { relations } = workItem;
    if (relations) {
      const childIds: string[] = [];
      for (const relation of relations) {
        const { attributes, url } = relation;
        if (!attributes || !(attributes.name === "Child")) {
          continue;
        }
        const id = url?.substr(url.lastIndexOf("/") + 1);
        if (id) {
          childIds.push(id);
        }
      }
      if (childIds.length) {
        return await this.getBacklogItems(childIds);
      }
    }
  }
}
