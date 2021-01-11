import { join, sep } from "path";
import { StorageService } from "../../models";

export class SimulatedStorageService<T> implements StorageService<T> {
  private store: { [location: string]: { [name: string]: T } } = {};
  private defaultWriteLocation = sep;

  private static standardizePath(path: string): string {
    const prefix = !path.startsWith(sep) ? sep : "";
    const suffix = !path.endsWith(sep) ? sep : "";

    return prefix + path + suffix;
  }

  public async find(name: string, startingLocation?: string | undefined): Promise<T | undefined> {
    if (!startingLocation) {
      return undefined;
    }

    const location = SimulatedStorageService.standardizePath(startingLocation);

    const directory = this.store[location];

    const nextLocation = SimulatedStorageService.standardizePath(join(location, ".."));

    if (!directory) {
      if (nextLocation === location) {
        return undefined;
      }

      return this.find(name, nextLocation);
    }

    const content = directory[name];

    if (content) {
      return content;
    }

    return nextLocation !== startingLocation ? this.find(name, nextLocation) : undefined;
  }

  read(name: string, location?: string | undefined): Promise<T | undefined> {
    const directoryLocation = location ?? this.defaultWriteLocation;
    const standardizedPath = SimulatedStorageService.standardizePath(directoryLocation);
    const directory = this.store[standardizedPath] ?? {};

    return Promise.resolve(directory[name]);
  }

  write(name: string, content: T, location?: string | undefined): Promise<boolean> {
    if (location === undefined && name.indexOf("/") !== -1) {
      const endOfPath = name.lastIndexOf("/") + 1;
      const filePath = name.substr(0, endOfPath);
      const fileName = name.substr(endOfPath);

      return this.write(fileName, content, filePath);
    }

    const directoryLocation = location ?? this.defaultWriteLocation;
    const standardizedPath = SimulatedStorageService.standardizePath(directoryLocation);
    const directory = this.store[standardizedPath] ?? {};

    directory[name] = content;
    this.store[directoryLocation] = directory;

    return Promise.resolve(true);
  }
}
