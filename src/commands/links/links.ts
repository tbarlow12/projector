import { Command } from "../../extensions";
import { writeFileSync } from "fs"
import { ConfigService } from "../../services/config/configServices";
import config from "config";

export const links = new Command()
  .name("links")
  .description("Open useful links")
  .addLinkCommands(config.get("links"));
