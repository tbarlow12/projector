import { Link } from "../models/general/link";
import config from "config";

export class ConfigUtils {
  public static getLink(name: string): Link {
    const links: Link[] = config.get("links");
    const link = links.find(link => link.name === "playbook");
    if (!link) {
      throw new Error(`Missing link ${name} in config`)
    }
    return link;
  }
}