import { AgileService } from "../agile";
import { PlaybookService } from "../playbook";
import { RepoService } from "../repo";

export interface ServiceCollection {
  repoService: RepoService;
  playbookService: PlaybookService;
  agileService?: AgileService;
}
