import { Command } from "commander";

export const init = new Command()
  .name("init")
  .description("Backlog Initialization")
  .action((args: any[]) => {
    console.log("Hello from backlog init");
  });