import { backlog } from "./backlog";

describe("Backlog Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(backlog.commands).toHaveLength(2);
  });
});
