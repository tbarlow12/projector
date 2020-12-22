import { Command } from "../../../../extensions";
import { playbookTemplateCopy } from "./commands";

export const playbookTemplate = new Command()
  .name("template")
  .description("Discover and use templates from playbook")
  .addCommand(playbookTemplateCopy);
