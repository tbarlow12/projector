import { Command } from "../../../../../extensions";
import { agileWorkCreate, agileWorkTemplate } from "./commands";

export const agileWork = new Command()
  .name("work")
  .description("Work Item Management")
  .addCommand(agileWorkCreate)
  .addCommand(agileWorkTemplate);
