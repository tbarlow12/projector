import { BacklogItem } from "./backlogItem";

export interface BacklogItemTemplate {
  name: string;
  description: string;
  items: BacklogItem[];
}
