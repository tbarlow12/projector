#!/usr/bin/env node
import { Command } from "./extensions";
import * as commands from "./commands";

new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .addCommands(commands)
  .action((args: any[]) => {
    console.log("Hey there");
  })
  .parse(process.argv);