import { Command } from "./command";
import open from "open";
import { Link } from "../models/general/link";

/**
 * Create command to open URL in browser
 * 
 * @param {Link} link Link
 * @param {string|undefined} path Path after base URL
 * @returns {Command} Command to open url in broswer
 */
export function urlCommand(link: Link, path?: string): Command {
  const { name, description, url } = link;
  return new Command()
    .name(name)
    .description(description)
    .addAction(async () => {
      await open(`${url}${path ? path : ""}`);
    });
}
