import config from "config";
import { Command } from "../../extensions";

export const links = new Command()
  .name("links")
  .description("Open useful links")
  .addLinkCommands(config.get("links"));
