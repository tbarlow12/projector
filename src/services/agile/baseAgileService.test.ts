import { AgileService, BacklogItem, BacklogItemType, Project, Sprint } from "../../models";
import { BaseAgileService } from "./baseAgileService";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MockAgileServiceFunctions {
  createProject: any;
  getSprint: any;
  deleteSprint: any;
  getBacklogItems: any;
  createProviderBacklogItems: any;
  deleteBacklogItems: any;
  createProviderSprints: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

class MockAgileService extends BaseAgileService {
  createProject: (project: Project) => Promise<Project>;
  getSprint: (id: string) => Promise<Sprint>;
  deleteSprint: (id: string) => Promise<void>;
  getBacklogItems: (ids: string[]) => Promise<BacklogItem[]>;
  createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  deleteBacklogItems: (ids: string[]) => Promise<void>;
  createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(functions: MockAgileServiceFunctions) {
    super({providerName: "test"});
    const {
      getBacklogItems,
      createProviderBacklogItems,
      createProviderSprints,
      deleteBacklogItems,
      getSprint,
      deleteSprint,
      createProject,
    } = functions;
    this.getBacklogItems = getBacklogItems;
    this.createProviderBacklogItems = createProviderBacklogItems;
    this.deleteBacklogItems = deleteBacklogItems;
    this.createProviderSprints = createProviderSprints;
    this.getSprint = getSprint;
    this.deleteSprint = deleteSprint;
    this.createProject = createProject;
  }
}

describe("Base Backlog Service", () => {
  it("calls abstract function to create backlog items and returns result", async () => {
    // Setup
    const createProviderBacklogItems = jest.fn((items: BacklogItem[]) => Promise.resolve(items.map((item: BacklogItem) => {
      return {
        ...item,
        id: 1
      };
    })));

    const createProviderSprints = jest.fn((sprints: Sprint[]) => Promise.resolve(sprints.map((sprint: Sprint) => {
      return {
        ...sprint,
        id: 1
      };
    })));
    
    const service: AgileService = new MockAgileService({
      createProviderBacklogItems,
      createProviderSprints,
      deleteBacklogItems: jest.fn(),
      createProject: jest.fn(),
      deleteSprint: jest.fn(),
      getBacklogItems: jest.fn(),
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
    expect(createProviderBacklogItems).toBeCalledTimes(1);
    expect(result).toEqual(backlogItems.map(item => {
      return {
        ...item,
        id: 1
      };
    }));
  });
});
