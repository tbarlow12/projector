import { playbook } from "./playbook";

describe("Playbook Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbook.commands).toHaveLength(2);
  });
});
