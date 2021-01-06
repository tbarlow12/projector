import { BacklogItemTemplate } from "../agile";
import { RepoItem } from "../repo";

export interface PlaybookService {
  getTemplates: () => Promise<BacklogItemTemplate[]>;
  getRepoItem: (pathInRepo: string, includeContent?: boolean) => Promise<RepoItem>;
  downloadRepoItem: (pathInRepo: string, localRelativePath: string) => Promise<void>;
}
