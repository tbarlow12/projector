import { agileCreate } from "./agileCreate";

describe("Backlog Create Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(agileCreate.commands).toHaveLength(0);
  });
});
