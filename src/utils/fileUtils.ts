import { readFileSync } from "fs";
import { join } from "path";

export class FileUtils {
  public static readJson(relativePath: string): any {
    const fileContent = readFileSync(join(process.cwd(), relativePath)).toString()
    return JSON.parse(fileContent)
  }
}