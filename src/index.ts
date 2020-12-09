#!/usr/bin/env node
import { join } from "path";
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

import { Command } from "./extensions";
import * as commands from "./commands";
import { registerProviders } from "./initialization/registerProviders";

new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .initialize(() => {
    registerProviders();
  })
  .asciiArt("CSE")
  .addCommands(commands)
  .parse(process.argv);