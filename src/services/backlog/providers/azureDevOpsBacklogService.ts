import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { TeamContext } from "azure-devops-node-api/interfaces/CoreInterfaces";
import { TreeStructureGroup } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { BacklogItem, Sprint } from "../../../models";
import { BacklogConfig } from "../../../models/config/backlog/backlogConfig";
import { BaseBacklogService } from "../baseBacklogService";

export interface AzureDevOpsProviderOptions {
  baseUrl: string;
  projectName: string;
  personalAccessToken: string;
}
export interface AzureDevOpsBacklogConfig extends BacklogConfig {
  providerOptions: AzureDevOpsProviderOptions;
} 

export class AzureDevOpsBacklogService extends BaseBacklogService {
  private projectName: string;
  private workItemTracking: WorkItemTrackingApi;
  private workApi: WorkApi;
  private coreApi: CoreApi;

  constructor(config: AzureDevOpsBacklogConfig) {
    super(config);
    
    const { baseUrl, personalAccessToken, projectName } = config.providerOptions;
    const authHandler = getPersonalAccessTokenHandler(personalAccessToken);
    
    this.projectName = projectName;
    this.coreApi = new CoreApi(baseUrl, [authHandler]);
    this.workItemTracking = new WorkItemTrackingApi(baseUrl, [authHandler]);
    this.workApi = new WorkApi(baseUrl, [authHandler]);
  }

  createProviderBacklogItems = async (items: BacklogItem[]): Promise<BacklogItem[]> => {
    // await this.workItemTracking.createWorkItem()
    return items;
  }

  createProviderSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    const teamContext = await this.getTeamContext();
    const identifier = await this.getIterationIdentifier();

    return Promise.all(sprints.map(async (sprint: Sprint) => {
      const result = await this.workApi.postTeamIteration({
        id: identifier?.toString(),
        // name,
        // attributes: {
        //   startDate,
        //   finishDate,
        //   // timeFrame: TimeFrame.Current
        // },
      }, teamContext);

      sprint.id = result.id;
      return sprint;
    }));
  }

  private async getIterationIdentifier(): Promise<string> {
    const { identifier } = await this.workItemTracking.getClassificationNode(this.projectName, TreeStructureGroup.Iterations);
    if (!identifier) {
      throw new Error(`Was not able to retrieve identifier for ${this.projectName}`);
    }

    return identifier;
  }

  private async getTeamContext(): Promise<TeamContext> {    
    const {
      name,
      id,
      defaultTeam
    } = await this.coreApi.getProject(this.projectName);

    return {
      project: name,
      projectId: id,
      team: defaultTeam?.name,
      teamId: defaultTeam?.id,
    };
  }
}
