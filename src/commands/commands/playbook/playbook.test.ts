import { playbook } from "./playbook";

describe("Playbook Command", () => {
  it("contains correct sub-commands", () => {
    expect(playbook.commands).toHaveLength(2);
  });
});
