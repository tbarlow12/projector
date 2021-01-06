import { BacklogItem, BacklogItemTemplate, BacklogItemType, ProjectorConfig } from "../../models";

export class ModelSimulator {
  public static createTestConfig(): ProjectorConfig {
    return {
      agile: {
        providerName: "simulator",
        providerOptions: {},
        sprints: {
          startDate: "2021-01-05",
          lengthOfSprintInDays: 5,
          daysBetweenSprints: 2,
          numberOfSprints: 10,
        },
      },
      github: {
        personalAccessToken: "myGithubToken",
      },
    };
  }

  public static createTestBacklogItemTemplate(): BacklogItemTemplate {
    return {
      name: "My Template",
      description: "This is my template",
      items: this.createTestBacklogItems(),
    };
  }

  public static createTestBacklogItems(): BacklogItem[] {
    return [
      {
        name: "My Task",
        type: BacklogItemType.Task,
      },
    ];
  }
}
