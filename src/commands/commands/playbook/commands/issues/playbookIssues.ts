import { Command } from "../../../../../extensions";
import { playbookIssueCreate, playbookIssuesOpen } from "./commands";

export const playbookIssues = new Command()
  .name("issues")
  .description("Interacting with issues in the code-with engineering playbook")
  .addCommand(playbookIssueCreate)
  .addCommand(playbookIssuesOpen);
