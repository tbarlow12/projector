import { Command } from "../../extensions";

export const init = new Command()
  .name("init")
  .description("Backlog Initialization")
  .action((args: any[]) => {
    console.log("Hello from cse init");
  });