import { backlog } from "./backlog";

describe("Backlog Command", () => {
  it("contains correct sub-commands", () => {
    expect(backlog.commands).toHaveLength(2);
  });
});
