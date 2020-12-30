import { TemplateItem } from ".";

export interface Template {
  id?: string;
  name: string;
  version: string;
  dependencies: Template[];
  items: TemplateItem[];
}
