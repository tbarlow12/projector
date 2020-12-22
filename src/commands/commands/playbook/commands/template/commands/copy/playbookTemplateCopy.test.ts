import { playbookTemplateCopy } from "./playbookTemplateCopy";

describe("Playbook Template Copy Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookTemplateCopy.commands).toHaveLength(0);
  });
});
