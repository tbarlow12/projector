import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export class FileUtils {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static readJson(relativePath: string): any {
    const path = join(process.cwd(), relativePath);
    if (existsSync(path)) {
      const fileContent = readFileSync(path).toString();
      return JSON.parse(fileContent);
    }
  }

  public static mkdirIfNotExists(path: string): void {
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  }

  public static writeFile(path: string, data: string): void {
    writeFileSync(path, data);
  }
}
