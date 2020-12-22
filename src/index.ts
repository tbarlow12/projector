#!/usr/bin/env node
import { config } from "dotenv";
config();

import { join } from "path";
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

import { backlog, init, links, playbook } from "./commands";
import { Command } from "./extensions";
import { registerProviders } from "./initialization/registerProviders";

new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .initialize(() => {
    registerProviders();
  })
  .asciiArt("CSE")
  .passCommandToAction(false)
  .addCommand(backlog)
  .addCommand(init)
  .addCommand(links)
  .addCommand(playbook)
  .printHelp()
  .parse(process.argv);

