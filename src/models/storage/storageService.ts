export interface StorageService<T> {
  find: (name: string, startingLocation?: string) => Promise<T | undefined>;
  read: (name: string, location?: string) => Promise<T | undefined>;
  write: (name: string, content: T, location?: string) => Promise<boolean>;
}
