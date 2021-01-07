import { TemplateItem } from "../template";

export interface PlaybookService {
  getTemplates: (predicate?: (templateItem: TemplateItem) => boolean) => Promise<TemplateItem[]>;
  downloadTemplate: (templateName: string, localRelativePath: string) => Promise<void>;
}
