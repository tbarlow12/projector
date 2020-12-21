import { Link } from "../models/general/link";
import config from "config";
import { ConfigValue } from "../constants";

export class Config {
  public static getValue<T=string>(valueName: ConfigValue): T {
    return config.get(valueName) as T;
  }

  public static getLink(name: string): Link {
    const links = this.getValue<Link[]>(ConfigValue.Links)
    const link = links.find(link => link.name === "playbook");
    if (!link) {
      throw new Error(`Missing link ${name} in config`)
    }
    return link;
  }
}
