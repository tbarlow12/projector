import { Command } from "../../../../../../../extensions";
import { agileWorkTemplateInit, agileWorkTemplateList } from "./commands";

export const agileWorkTemplate = new Command()
  .name("template")
  .description("Work Item Templates")
  .addCommand(agileWorkTemplateInit)
  .addCommand(agileWorkTemplateList);
