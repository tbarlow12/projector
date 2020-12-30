import { BacklogItem, BacklogItemType, AgileService, Sprint, Project } from "../../models";
import { BaseAgileService } from "./baseAgileService";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";

class MockAgileService extends BaseAgileService {
  createProject: (project: Project) => Promise<Project>;
  getSprint: (id: string) => Promise<Sprint>;
  deleteSprint: (id: string) => Promise<void>;
  createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(createBacklogItemsJestFn: any, createSprintsJestFn: any, getSprint: any, deleteSprint: any, createProject: any) {
    super({providerName: "test"});
    this.createProviderBacklogItems = createBacklogItemsJestFn;
    this.createProviderSprints = createSprintsJestFn;
    this.getSprint = getSprint;
    this.deleteSprint = deleteSprint;
    this.createProject = createProject;
  }
}

describe("Base Backlog Service", () => {
  it("calls abstract function to create backlog items and returns result", async () => {
    // Setup
    const createBacklogItems = jest.fn((items: BacklogItem[]) => Promise.resolve(items.map((item: BacklogItem) => {
      return {
        ...item,
        id: 1
      };
    })));

    const createSprints = jest.fn((sprints: Sprint[]) => Promise.resolve(sprints.map((sprint: Sprint) => {
      return {
        ...sprint,
        id: 1
      };
    })));
    
    const service: AgileService = new MockAgileService(createBacklogItems, createSprints, jest.fn(), jest.fn(), jest.fn());
    const backlogItems: BacklogItem[] = [
      {
        name: "Story 1",
        type: BacklogItemType.Story
      },
      {
        name: "Story 2",
        type: BacklogItemType.Story
      }
    ];

    // Act
    const result = await service.createBacklogItems(backlogItems);

    // Assert
    expect(createBacklogItems).toBeCalledTimes(1);
    expect(result).toEqual(backlogItems.map(item => {
      return {
        ...item,
        id: 1
      };
    }));
  });

  it("returns empty sample backlog items", () => {
    // Act & Assert
    expect(MockAgileService.createSampleBacklogItems(true)).toEqual(emptyBacklogItems);
  });

  it("returns default sample backlog items", () => {
    // Act & Assert
    expect(MockAgileService.createSampleBacklogItems(false)).toEqual(defaultBacklogItems);
  });
});
