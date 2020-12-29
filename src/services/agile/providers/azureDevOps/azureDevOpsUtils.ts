import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { BacklogItem, BacklogItemType } from "../../../../models";
import { AzureDevOpsWorkItemType } from "./azureDevOpsWorkItemType";
import { AzDOJsonPatchDocument, AzDoOp, JsonFieldPatch } from "./jsonPatchDocument";

interface FieldValuePair {
  field: string;
  value?: string;
}

export class AzureDevOpsUtils {
  public static createPatchDocument(backlogItem: BacklogItem): AzDOJsonPatchDocument {
    const pairs = this.createFieldValuePairs(backlogItem);
    
    // Only include pairs whose value is defined
    return pairs
      .filter(pair => pair.value)
      .map((pair: FieldValuePair) => {
        return {
          op: AzDoOp.Add,
          from: null,
          path: `/fields/${pair.field}`,
          value: pair.value as string,
        };
      });
  }

  public static mapWorkItem(workItem: WorkItem): BacklogItem {
    const { id, fields } = workItem;
    if (!id) {
      throw new Error("ID should be defined for work item");
    }

    return {
      id: id.toString(),
      name: "",
      type: BacklogItemType.Task,
    };
  }

  public static getWorkItemType(backlogItem: BacklogItem): AzureDevOpsWorkItemType {
    switch (backlogItem.type) {
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
        throw new Error(`Unsupported backlog item type: ${backlogItem.type}`);
    }
  }

  private static createFieldValuePairs(backlogItem: BacklogItem): FieldValuePair[] {
    const { name, description, acceptanceCriteria, } = backlogItem;
    return [
      {
        field: "System.Title",
        value: name,
      },
      {
        field: "System.Description",
        value: description,
      },
      {
        field: "Microsoft.VSTS.Common.AcceptanceCriteria",
        value: this.stringifyAcceptanceCriteria(acceptanceCriteria)
      }
    ];
  }

  private static stringifyAcceptanceCriteria(acceptanceCriteria?: string[]): string|undefined {
    if (!acceptanceCriteria) {
      return undefined;
    }

    return `<div><ul>${acceptanceCriteria.map((line: string) => `<li>${line}</li>`)}</ul></div>`
  }
}
