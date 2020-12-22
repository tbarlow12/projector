import { playbookIssueCreate } from "./playbookIssuesCreate";

describe("Playbook Issues Create Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookIssueCreate.commands).toHaveLength(0);
  });
});
