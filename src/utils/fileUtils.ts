import fs from "fs"
import { join } from "path";
import { promisify } from "util"

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);

export class FileUtils {
  public static async readJson(relativePath: string): Promise<any> {
    const fileContent = await readFile(join(process.cwd(), relativePath)).toString()
    return JSON.parse(fileContent)
  }

  public static async mkdirIfNotExists(path: string): Promise<void> {
    if (!fs.existsSync(path)) {
      await mkdir(path);
    }
  }

  public static async writeFile(path: string, data: string): Promise<void> {
    return writeFile(path, data);
  }
}
