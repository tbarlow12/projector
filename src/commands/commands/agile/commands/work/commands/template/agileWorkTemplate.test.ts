import { agileWorkTemplate } from "./agileWorkTemplate";

describe("Agile Work Template", () => {
  it("contains correct number of sub-commands", () => {
    expect(agileWorkTemplate.commands).toHaveLength(2);
  });
});
