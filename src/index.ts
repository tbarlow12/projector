#!/usr/bin/env node
import { Command } from "./extensions";
import * as commands from "./commands";
import { registerProviders } from "./initialization/registerProviders";

new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .initialize(() => {
    registerProviders();
  })
  .addCommands(commands)
  .parse(process.argv);