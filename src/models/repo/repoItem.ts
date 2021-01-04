export enum RepoItemType {
  Directory = "Directory",
  File = "File",
}

export interface RepoItem {
  type: RepoItemType;
  name: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  children?: RepoItem[];
}
