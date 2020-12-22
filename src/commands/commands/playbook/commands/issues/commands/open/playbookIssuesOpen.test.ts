import { playbookIssuesOpen } from "./playbookIssuesOpen";

describe("Playbook Issues Open Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookIssuesOpen.commands).toHaveLength(0);
  });
});
