import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Parameters } from "../models";
import { Interpolator } from "./interpolator";

export class FileUtils {
  public static readJson<T>(relativePath?: string, parameters?: Parameters): T | undefined {
    if (!relativePath) {
      return undefined;
    }

    const path = join(process.cwd(), relativePath);
    if (existsSync(path)) {
      const fileContent = readFileSync(path).toString();
      const interpolated = Interpolator.interpolate(fileContent, parameters);
      return JSON.parse(interpolated);
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
