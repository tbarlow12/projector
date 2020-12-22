import { playbookTemplate } from "./playbookTemplate";

describe("Playbook Template Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookTemplate.commands).toHaveLength(2);
  });
});
