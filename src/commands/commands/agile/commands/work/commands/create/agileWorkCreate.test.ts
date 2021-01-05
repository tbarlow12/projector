import { agileWorkCreate } from "./agileWorkCreate";

describe("Backlog Create Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(agileWorkCreate.commands).toHaveLength(0);
  });
});
