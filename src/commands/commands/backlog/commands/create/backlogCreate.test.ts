import { backlogCreate } from "./backlogCreate";

describe("Backlog Create Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(backlogCreate.commands).toHaveLength(0);
  });
});
