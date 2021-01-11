import { AgileService, BacklogItemTemplate } from "../agile";
import { StorageService } from "../storage";
import { PlaybookService } from "../playbook";
import { RepoService } from "../repo";
import { TemplateItem } from "../template";
import { ProjectorConfig } from "..";

export interface ServiceCollection {
  agileService?: AgileService;
  backlogItemStorageService: StorageService<BacklogItemTemplate>;
  configStorageService: StorageService<ProjectorConfig>;
  templateStorageService: StorageService<TemplateItem>;
  playbookService: PlaybookService;
  repoService: RepoService;
}
