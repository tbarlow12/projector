import config from "config";
import { Command } from "../../../extensions";

export const links = new Command()
  .name("links")
  .description("Commonly used links in CSE")
  .addLinkCommands(config.get("links"));
