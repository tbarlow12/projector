import { NumberConstants } from "../../constants";
import { BacklogService } from "../../models";
import { BacklogItem } from "../../models/backlog/backlogItem";
import { Sprint } from "../../models/backlog/sprint";
import { BacklogConfig } from "../../models/config/backlog/backlogConfig";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";

export abstract class BaseBacklogService implements BacklogService {
  constructor(protected config: BacklogConfig){}

  // Static functions

  public static createSampleBacklogItems(empty = false): BacklogItem[] {
    return empty ? emptyBacklogItems : defaultBacklogItems;
  }

  // Base functions
 
  public createBacklogItems(items: BacklogItem[]): Promise<BacklogItem[]> {
    return this.createProviderBacklogItems(items);
  }

  public async createSprints(): Promise<Sprint[]> {
    const sprints = this.createSprintsFromConfig();
    return this.createProviderSprints(sprints);
  }

  // Abstract functions
  
  abstract createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  abstract createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;

  // Private functions

  private createSprintsFromConfig(): Sprint[] {
    const { sprints: sprintConfig } = this.config;
    
    if (!sprintConfig) {
      throw new Error("Section backlog.sprints of cse.json is required for this operation");
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
