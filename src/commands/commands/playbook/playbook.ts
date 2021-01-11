import { Command } from "../../../extensions";
import { playbookIssues, playbookTemplate } from "./commands";

export const playbook = new Command()
  .name("playbook")
  .description("Interacting with the Code-With-Engineering Playbook")
  .addCommand(playbookIssues)
  .addCommand(playbookTemplate);
