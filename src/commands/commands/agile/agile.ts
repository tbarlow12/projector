import { Command } from "../../../extensions";
import { agileSprints, agileWork } from "./commands";

export const agile = new Command()
  .name("agile")
  .description("Agile Configuration Management")
  .addCommand(agileSprints)
  .addCommand(agileWork);
