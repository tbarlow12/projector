import { Command } from "../../extensions";
import {
  backlogCreate,
  backlogInit,
} from "./commands";

export const backlog = new Command()
  .name("backlog")
  .description("Backlog management")
  .addCommand(backlogCreate)
  .addCommand(backlogInit)
