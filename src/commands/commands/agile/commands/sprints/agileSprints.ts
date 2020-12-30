import { Command } from "../../../../../extensions";
import { agileSprintsCreate } from "./commands";

export const agileSprints = new Command()
  .name("sprints")
  .description("Sprint Management")
  .addCommand(agileSprintsCreate);
