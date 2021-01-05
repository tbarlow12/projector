import { Command } from "../../../extensions";
import { projectInit } from "./commands";

export const project = new Command().name("project").description("Project configuration").addCommand(projectInit);
