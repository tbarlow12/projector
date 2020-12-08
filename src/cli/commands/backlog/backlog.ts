import { Command } from "commander";

export const backlog = new Command()
  .name("backlog")
  .description("Backlog management")
  .action((args: any[]) => {
    console.log("Hello from backlog");
  });