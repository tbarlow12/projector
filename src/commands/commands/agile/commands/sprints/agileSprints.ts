import { Command } from "../../../../../extensions";
import { agileSprintsInit } from "./commands";

export const agileSprints = new Command()
  .name("sprints")
  .addCommand(agileSprintsInit);
  
