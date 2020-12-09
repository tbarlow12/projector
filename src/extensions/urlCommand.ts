import { Command } from "./command"
import open from "open"

export function urlCommand(name: string, description: string, url: string): Command {
  return new Command(name)
    .description(description)
    .execute(async () => {
      await open(url);
    });
}