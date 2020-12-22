import { Command } from "./command";
import open from "open";
import { Link } from "../models/general/link";

export function urlCommand(link: Link, path?: string): Command {
  const { name, description, url } = link;
  return new Command()
    .name(name)
    .description(description)
    .addAction(async () => {
      await open(`${url}${path ? path : ""}`);
    });
}
