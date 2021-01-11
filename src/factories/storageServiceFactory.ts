import { StorageService } from "../models";
import { FileStorageService } from "../services/storage";
import { SimulatedStorageService } from "../services/storage/simulatedStorageService";

export enum StorageType {
  FILE,
  SIMULATED,
}

export class StorageServiceFactory {
  public static get<T>(type: StorageType, location?: string): StorageService<T> {
    if (type === StorageType.FILE) {
      return new FileStorageService<T>(location ?? process.cwd());
    } else {
      return new SimulatedStorageService<T>();
    }
  }
}
