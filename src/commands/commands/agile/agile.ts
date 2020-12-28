import { Command } from "../../../extensions";
import {
  agileCreate, agileInit
} from "./commands";
import { agileSprints } from "./commands/sprints";

export const agile = new Command()
  .name("agile")
  .description("Agile Configuration Management")
  .addCommand(agileCreate)
  .addCommand(agileInit)
  .addCommand(agileSprints);
