import { agileInit } from "./agileInit";

describe("Agile Init Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(agileInit.commands).toHaveLength(0);
  });
});
