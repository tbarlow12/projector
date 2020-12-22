import { playbookIssues } from "./playbookIssues";

describe("Playbook Issues Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookIssues.commands).toHaveLength(2);
  });
});
