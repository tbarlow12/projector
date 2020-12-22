#!/usr/bin/env node
import { config } from "dotenv";
config();

import { join } from "path";
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

import { cse } from "./commands";
cse.parse(process.argv);
