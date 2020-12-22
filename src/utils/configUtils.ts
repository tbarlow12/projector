import { Link } from "../models/general/link";
import { ConfigValue } from "../constants";

export class Config {
  public static getValue<T=string>(valueName: ConfigValue): T {
    /* For posterity - requiring instead of importing here
     * just to give time for all environment variables to load.
     * If they are not loaded when the `config` library is imported,
     * the variables do not make it into the configuration
     */
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require("config");
    return config.get(valueName) as T;
  }

  public static getValueWithDefault<T=string>(valueName: ConfigValue, defaultValue?: T): T|undefined {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require("config");
    return (config.has(valueName)) ? config.get(valueName) : defaultValue;
  }

  public static getLink(name: string): Link {
    const links = this.getValue<Link[]>(ConfigValue.Links)
    const link = links.find(link => link.name === name);
    if (!link) {
      throw new Error(`Missing link ${name} in config`)
    }
    return link;
  }
}
