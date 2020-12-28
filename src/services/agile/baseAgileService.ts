import { NumberConstants } from "../../constants";
import { AgileConfig, BacklogItem, BacklogService, Sprint } from "../../models";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";

export abstract class BaseAgileService implements BacklogService {
  constructor(protected config: AgileConfig){}

  // Static functions

  public static createSampleBacklogItems(empty = false): BacklogItem[] {
    return empty ? emptyBacklogItems : defaultBacklogItems;
  }

  // Base functions
 
  public createBacklogItems(items: BacklogItem[]): Promise<BacklogItem[]> {
    return this.createProviderBacklogItems(items);
  }

  public async createSprints(sprints: Sprint[]): Promise<Sprint[]> {
    sprints = sprints || this.createSprintsFromConfig();
    return this.createProviderSprints(sprints);
  }

  // Abstract functions
  
  abstract getSprint: (id: string) => Promise<Sprint>;
  abstract createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  abstract createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  abstract deleteSprint: (id: string) => Promise<void>;

  // Private functions

  private createSprintsFromConfig(): Sprint[] {
    const { sprints: sprintConfig } = this.config;
    
    if (!sprintConfig) {
      throw new Error("Section agile.sprints of cse.json is required for this operation");
    }

    const { startDate, lengthOfSprintInDays, numberOfSprints } = sprintConfig;
    const sprints: Sprint[] = [];

    const timezoneOffset = new Date().getTimezoneOffset() * NumberConstants.millisecondsInAMinute;

    let currentStartDate = new Date(Date.parse(startDate) + timezoneOffset);

    for (let i = 0; i < numberOfSprints; i++) {
      const finishDate = new Date(currentStartDate.getTime() + NumberConstants.millisecondsInADay * lengthOfSprintInDays);
      sprints.push({
        name: `Sprint ${i + 1}`,
        startDate: currentStartDate,
        finishDate,
      });
      currentStartDate = finishDate;
    }

    return sprints;
  }
}
