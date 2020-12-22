import { projectInit } from "./projectInit";

describe("Project Init Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(projectInit.commands).toHaveLength(0);
  });
});
