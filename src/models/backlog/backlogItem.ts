import { BacklogItemType } from "./backlogItemType";

export interface BacklogItem {
  id?: string;
  name: string;
  description: string;
  children: BacklogItem[];
  acceptanceCriteria: string[];
  type: BacklogItemType
}
