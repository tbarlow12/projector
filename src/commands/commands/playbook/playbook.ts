import { Command } from "../../../extensions";
import { playbookIssues, playbookTemplate } from "./commands";

export const playbook = new Command()
  .name("playbook")
  .description("Interacting with a playbook")
  .addCommand(playbookIssues)
  .addCommand(playbookTemplate);
