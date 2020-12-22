import { BacklogItem, BacklogItemType, Sprint } from "../../models";
import { BaseBacklogService } from "./baseBacklogService";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";

class MockBacklogService extends BaseBacklogService {
  createBacklogItem: (item: BacklogItem) => Promise<BacklogItem>;
  createSprint: (sprint: Sprint) => Promise<Sprint>;
  
  constructor(createBacklogItemJestFn: any, createSprintJestFn: any) {
    super({providerName: "test"});
    this.createBacklogItem = createBacklogItemJestFn;
    this.createSprint = createSprintJestFn;
  }
}

describe("Base Backlog Service", () => {
  it("calls abstract function to create backlog items and returns result", async () => {
    const createBacklogItem = jest.fn((item: BacklogItem) => Promise.resolve({
      ...item,
      id: 1
    }));

    const createSprint = jest.fn((item: Sprint) => Promise.resolve({
      ...item,
      id: 1
    }));
    
    const service = new MockBacklogService(createBacklogItem, createSprint);
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

    const result = await service.createBacklogItems(backlogItems);

    expect(createBacklogItem).toBeCalledTimes(backlogItems.length);
    expect(result).toEqual(backlogItems.map(item => {
      return {
        ...item,
        id: 1
      };
    }));
  });

  it("returns empty sample backlog items", () => {
    expect(MockBacklogService.createSampleBacklogItems(true)).toEqual(emptyBacklogItems);
  });

  it("returns default sample backlog items", () => {
    expect(MockBacklogService.createSampleBacklogItems(false)).toEqual(defaultBacklogItems);
  });
});
