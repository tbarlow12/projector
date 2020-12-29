import { BacklogItem, BacklogItemType } from "../../../../models";
import { AzureDevOpsWorkItemField } from "./azureDevOpsWorkItemField";
import { AzureDevOpsWorkItemType } from "./azureDevOpsWorkItemType";
import { AzDOJsonPatchDocument, AzDoOp } from "./jsonPatchDocument";

interface FieldValuePair {
  field: AzureDevOpsWorkItemField;
  value?: string;
}

export class AzureDevOpsUtils {
  public static createPatchDocument(backlogItem: BacklogItem, parentUrl?: string): AzDOJsonPatchDocument {
    const pairs = this.createFieldValuePairs(backlogItem);
    
    // Only include pairs whose value is defined
    const document: AzDOJsonPatchDocument = pairs
      .filter(pair => pair.value)
      .map((pair: FieldValuePair) => {
        return {
          op: AzDoOp.Add,
          path: `/fields/${pair.field}`,
          value: pair.value as string,
        };
      });
    
    if (parentUrl) {
      document.push({
        op: AzDoOp.Add,
        path: "/relations/-",
        value: {
          rel: "System.LinkTypes.Hierarchy-Reverse",
          url: parentUrl,
          attributes: {
            isLocked: false,
            name: "Parent",
          }
        }
      });
    }
    
    return document;
  }

  public static getWorkItemType(backlogItemType: BacklogItemType): AzureDevOpsWorkItemType {
    switch (backlogItemType) {
      case BacklogItemType.Task:
        return AzureDevOpsWorkItemType.Task;
      case BacklogItemType.Story:
        return AzureDevOpsWorkItemType.UserStory;
      case BacklogItemType.Feature:
        return AzureDevOpsWorkItemType.Feature;
      case BacklogItemType.Epic:
        return AzureDevOpsWorkItemType.Epic;
      case BacklogItemType.Bug:
        return AzureDevOpsWorkItemType.Bug;
      default:
        throw new Error(`Unsupported backlog item type: ${backlogItemType}`);
    }
  }

  public static getBacklogItemType(workItemType: AzureDevOpsWorkItemType): BacklogItemType {
    switch (workItemType) {
      case AzureDevOpsWorkItemType.Task:
        return BacklogItemType.Task;
      case AzureDevOpsWorkItemType.UserStory:
        return BacklogItemType.Story;
      case AzureDevOpsWorkItemType.Feature:
        return BacklogItemType.Feature;
      case AzureDevOpsWorkItemType.Epic:
        return BacklogItemType.Epic;
      case AzureDevOpsWorkItemType.Bug:
        return BacklogItemType.Bug;
      default:
        throw new Error(`Unsupported backlog item type: ${workItemType}`);
    }
  }

  private static createFieldValuePairs(backlogItem: BacklogItem): FieldValuePair[] {
    const { name, description, acceptanceCriteria, } = backlogItem;
    return [
      {
        field: AzureDevOpsWorkItemField.Name,
        value: name,
      },
      {
        field: AzureDevOpsWorkItemField.Description,
        value: description,
      },
      {
        field: AzureDevOpsWorkItemField.AcceptanceCriteria,
        value: this.stringifyAcceptanceCriteria(acceptanceCriteria)
      }
    ];
  }

  private static stringifyAcceptanceCriteria(acceptanceCriteria?: string|string[]): string|undefined {
    if (!acceptanceCriteria) {
      return undefined;
    }

    return (Array.isArray(acceptanceCriteria))
      ? `<div><ul>${acceptanceCriteria.map((line: string) => `<li>${line}</li>`).join("")}</ul></div>`
      : acceptanceCriteria;
  }
}
