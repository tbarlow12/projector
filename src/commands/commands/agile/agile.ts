import { Command } from "../../../extensions";
import {
  agileInit, agileSprints
} from "./commands";

export const agile = new Command()
  .name("agile")
  .description("Agile Configuration Management")
  .addCommand(agileInit)
  .addCommand(agileSprints);
