import { AgileService, BacklogItem, BacklogItemType, Project, Sprint } from "../../models";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";
import { BaseAgileService } from "./baseAgileService";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MockAgileServiceFunctions {
  getBacklogItems: any;
  createBacklogItems: any;
  deleteBacklogItems: any;
  getSprint: any;
  createSprints: any;
  deleteSprint: any;
  createProject: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */


class MockAgileService extends BaseAgileService {
  createProject: (project: Project) => Promise<Project>;

  getBacklogItems: (ids: string[], includeChildren?: boolean) => Promise<BacklogItem[]>;
  createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  deleteBacklogItems: (ids: string[]) => Promise<void>;

  getSprint: (id: string) => Promise<Sprint>;
  createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  deleteSprint: (id: string) => Promise<void>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(mockFunctions: MockAgileServiceFunctions) {
    super({providerName: "test"});
    const {
      getBacklogItems,
      createBacklogItems,
      deleteBacklogItems,
      createProject,
      createSprints,
      deleteSprint,
      getSprint,
    } = mockFunctions;
    
    this.getBacklogItems = getBacklogItems;
    this.createProviderBacklogItems = createBacklogItems;
    this.deleteBacklogItems = deleteBacklogItems;
    this.createProviderSprints = createSprints;
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
    
    const service: AgileService = new MockAgileService({
      createBacklogItems,
      createSprints,
      createProject: jest.fn(),
      getBacklogItems: jest.fn(),
      deleteBacklogItems: jest.fn(),
      deleteSprint: jest.fn(),
      getSprint: jest.fn(),
    });
    
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
