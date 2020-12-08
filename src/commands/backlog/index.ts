import { Command } from "../../extensions";
import * as commands from "./commands";

export const backlog = new Command()
  .name("backlog")
  .description("Backlog management")
  .addCommands(commands)
  .action((args: any[]) => {
    console.log("Hello from backlog");
  });