import { Command } from "commander";
import * as subCommands from "./commands";

export const program = new Command()
  .description("CSE Bootstrap CLI");

Object.values(subCommands).forEach(command => program.addCommand(command));

program.parse(process.argv);