import { backlogCreate } from "./backlogCreate";

describe("Backlog Create Command", () => {
  it("contains correct sub-commands", () => {
    expect(backlogCreate.commands).toHaveLength(0);
  });
});
