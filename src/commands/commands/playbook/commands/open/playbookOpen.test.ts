import { playbookOpen } from "./playbookOpen";

describe("Playbook Open Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookOpen.commands).toHaveLength(0);
  });
});
