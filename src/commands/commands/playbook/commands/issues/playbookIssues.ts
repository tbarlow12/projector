import { Command } from "../../../../../extensions";
import { playbookIssueCreate, playbookIssuesOpen } from "./commands";

export const playbookIssues = new Command()
  .name("issues")
  .description("Playbook Issues")
  .addCommand(playbookIssueCreate)
  .addCommand(playbookIssuesOpen);
