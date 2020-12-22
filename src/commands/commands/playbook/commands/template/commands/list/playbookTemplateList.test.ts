import { playbookTemplateList } from "./playbookTemplateList";

describe("Playbook Template List Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookTemplateList.commands).toHaveLength(0);
  });
});
