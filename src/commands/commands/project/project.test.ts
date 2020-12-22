import { project } from "./project";

describe("Project Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(project.commands).toHaveLength(1);
  });
});
