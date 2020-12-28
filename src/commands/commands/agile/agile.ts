import { Command } from "../../../extensions";
import {
  agileCreate, agileInit
} from "./commands";

export const agile = new Command()
  .name("agile")
  .description("Agile Configuration Management")
  .addCommand(agileCreate)
  .addCommand(agileInit);
