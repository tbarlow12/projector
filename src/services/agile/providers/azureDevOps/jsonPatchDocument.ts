export enum AzDoOp {
  Add = "add"
}

export interface JsonFieldPatch {
  op: AzDoOp;
  path: string;
  from: string|null;
  value: string;
}

export type AzDOJsonPatchDocument = JsonFieldPatch[];
