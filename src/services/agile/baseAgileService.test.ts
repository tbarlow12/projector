import { AgileService, BacklogItem, BacklogItemType, Sprint } from "../../models";
import { SimulatorAgileService } from "../../test";

describe("Base Backlog Service", () => {
  it("calls abstract function to create backlog items and returns result", async () => {
    // Setup
    const createBacklogItems = jest.fn((items: BacklogItem[]) =>
      Promise.resolve(
        items.map((item: BacklogItem) => {
          return {
            ...item,
            id: "1",
          };
        }),
      ),
    );

    const createProviderSprints = jest.fn((sprints: Sprint[]) =>
      Promise.resolve(
        sprints.map((sprint: Sprint) => {
          return {
            ...sprint,
            id: "1",
          };
        }),
      ),
    );

    const service: AgileService = new SimulatorAgileService({
      createBacklogItems,
      createProviderSprints,
    });

    const backlogItems: BacklogItem[] = [
      {
        name: "Story 1",
        type: BacklogItemType.Story,
      },
      {
        name: "Story 2",
        type: BacklogItemType.Story,
      },
    ];

    // Act
    const result = await service.createBacklogItems(backlogItems);

    // Assert
    expect(createBacklogItems).toBeCalledTimes(1);
    expect(result).toEqual(
      backlogItems.map((item) => {
        return {
          ...item,
          id: "1",
        };
      }),
    );
  });
});
