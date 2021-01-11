import { StorageService } from "../../models/storage";
import { readFile, realpath, writeFile } from "fs/promises";
import { sep, join } from "path";
import { Logger } from "../../utils";

export class FileStorageService<T> implements StorageService<T> {
  private static readWriteOptions: "utf8";
  private defaultWriteLocation: string;

  constructor(defaultWriteLocation: string) {
    this.defaultWriteLocation = defaultWriteLocation;
  }

  public async find(fileName: string, startingDirectory?: string): Promise<T | undefined> {
    const path = startingDirectory ?? this.defaultWriteLocation;

    const filePath = await this.read(fileName, path);
    if (filePath) {
      return filePath;
    }

    for (
      let parentDirectory = path;
      parentDirectory !== startingDirectory || parentDirectory !== sep;
      parentDirectory = join(parentDirectory, "..")
    ) {
      try {
        const directory = await realpath(parentDirectory);

        return this.find(fileName, directory);
      } catch (e) {
        if (e.code !== "ENOENT") {
          throw e;
        }
        /** otherwise, that didn't exist, so just swallow it */
      }
    }

    return undefined;
  }

  public async read(fileName: string, directory?: string): Promise<T | undefined> {
    try {
      const path = directory ?? this.defaultWriteLocation;
      const filePath = join(path, fileName);
      const data = await readFile(filePath, FileStorageService.readWriteOptions);
      const content: T = JSON.parse(data);

      return content;
    } catch (e) {
      if (e.code === "ENOENT") {
        return undefined;
      } else {
        throw e;
      }
    }
  }

  public async write(fileName: string, content: T, directory?: string): Promise<boolean> {
    const path = directory ?? this.defaultWriteLocation;
    const filePath = join(path, fileName);
    const data = JSON.stringify(content);

    try {
      await writeFile(filePath, data, FileStorageService.readWriteOptions);
    } catch (err) {
      Logger.log(`Could not write file ${fileName} to ${path}:`);
      Logger.log(err);

      return false;
    }

    return true;
  }
}
