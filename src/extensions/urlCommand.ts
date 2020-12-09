import { Command } from "./command"
import open from "open"
import { Link } from "../models/general/link";

export function urlCommand(link: Link): Command {
  const { name, description, url } = link;
  return new Command()
    .name(name)
    .description(description)
    .execute(async () => {
      await open(url);
    });
}