import { agile } from "./agile";

describe("Backlog Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(agile.commands).toHaveLength(2);
  });
});
