import { Command } from "../../../../extensions";
import { playbookIssueCreate, playbookIssuesOpen } from "./commands";

export const playbookIssues = new Command()
  .name("issues")
  .description("CSE Playbook Issues")
  .addCommand(playbookIssueCreate)
  .addCommand(playbookIssuesOpen);
