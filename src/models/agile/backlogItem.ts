import { BacklogItemType } from "./backlogItemType";

export interface BacklogItem {
  name: string;
  type: BacklogItemType;
  id?: string;
  url?: string;
  description?: string;
  children?: BacklogItem[];
  acceptanceCriteria?: string|string[];
  assignedTo?: string;
}
