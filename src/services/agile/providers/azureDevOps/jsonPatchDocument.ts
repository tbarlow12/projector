export enum AzDoOp {
  Add = "add",
}

export interface JsonFieldPatch {
  op: AzDoOp;
  path: string;
  from?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export type AzDOJsonPatchDocument = JsonFieldPatch[];
