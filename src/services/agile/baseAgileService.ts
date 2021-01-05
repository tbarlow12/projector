import { ConfigValue, NumberConstants } from "../../constants";
import { AgileConfig, AgileService, BacklogItem, Project, Sprint } from "../../models";
import { Config, DateUtils, UserUtils } from "../../utils";

export abstract class BaseAgileService implements AgileService {
  constructor(protected config: AgileConfig){}

  // Base functions
 
  public createBacklogItems(items: BacklogItem[]): Promise<BacklogItem[]> {
    return this.createProviderBacklogItems(items);
  }

  public async createSprints(sprints?: Sprint[]): Promise<Sprint[]> {
    sprints = sprints || this.generateSprints();
    return this.confirmAndCreateSprints(sprints);
  }

  // Abstract functions

  // Backlog Items
  abstract getBacklogItems: (ids: string[]) => Promise<BacklogItem[]>;
  abstract createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  abstract deleteBacklogItems: (ids: string[]) => Promise<void>;

  // Projects
  abstract createProject: (project: Project) => Promise<Project>;
  
  // Sprints
  abstract getSprint: (id: string) => Promise<Sprint>;
  abstract createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  abstract deleteSprint: (id: string) => Promise<void>;

  // Private functions

  private generateSprints(): Sprint[] {
    const { sprints: sprintConfig } = this.config;
    if (!sprintConfig) {
      throw new Error("Section agile.sprints of cse.json is required for this operation");
    }
    const { startDate, lengthOfSprintInDays, numberOfSprints, daysBetweenSprints, sprintNamePattern, sprintIndexStart } = sprintConfig;

    const namePattern: string = sprintNamePattern || Config.getValue(ConfigValue.DefaultSprintNamePattern);
    const indexStart: number = sprintIndexStart || Config.getValue(ConfigValue.DefaultSprintStartIndex);

    const sprints: Sprint[] = [];

    const timezoneOffset = new Date().getTimezoneOffset() * NumberConstants.millisecondsInAMinute;

    let currentStartDate = new Date(Date.parse(startDate) + timezoneOffset);

    for (let i = indexStart; i <= numberOfSprints; i++) {
      const finishDate = DateUtils.addDays(currentStartDate, lengthOfSprintInDays - 1);
      sprints.push({
        name: namePattern.replace("${sprintIndex}", i.toString()),
        startDate: currentStartDate,
        finishDate,
      });
      currentStartDate = DateUtils.addDays(finishDate, daysBetweenSprints + 1);
    }
    return sprints;
  }

  private async confirmAndCreateSprints(sprints: Sprint[]): Promise<Sprint[]> {
    console.log("The following sprints will be created:\n");

    sprints.forEach((sprint: Sprint) => {
      const { name, startDate, finishDate } = sprint;
      console.log(`${name}:\t${DateUtils.toSimpleDateString(startDate)}\t${DateUtils.toSimpleDateString(finishDate)}`);
    });

    if (await UserUtils.confirmAction()) {
      console.log("\nCreating sprints...");
      const createdSprints = await this.createProviderSprints(sprints);
      console.log("\nCreated sprints");
      return createdSprints;
    } else {
      console.log("Operation cancelled");
      return [];
    }
  }
}
