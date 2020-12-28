import { BacklogItem, BacklogItemType, BacklogService, Sprint } from "../../models";
import { BaseBacklogService } from "./baseBacklogService";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";

class MockBacklogService extends BaseBacklogService {
  getSprint: (id: string) => Promise<Sprint>;
  deleteSprint: (id: string) => Promise<void>;
  createProviderBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(createBacklogItemsJestFn: any, createSprintsJestFn: any, getSprint: any, deleteSprint: any) {
    super({providerName: "test"});
    this.createProviderBacklogItems = createBacklogItemsJestFn;
    this.createProviderSprints = createSprintsJestFn;
    this.getSprint = getSprint;
    this.deleteSprint = deleteSprint;
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
    
    const service: BacklogService = new MockBacklogService(createBacklogItems, createSprints, jest.fn(), jest.fn());
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
    expect(MockBacklogService.createSampleBacklogItems(true)).toEqual(emptyBacklogItems);
  });

  it("returns default sample backlog items", () => {
    // Act & Assert
    expect(MockBacklogService.createSampleBacklogItems(false)).toEqual(defaultBacklogItems);
  });
});
