import { playbook } from "./playbook";

describe("Playbook Command", () => {
  const originalLogFunction = console.log;
  
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalLogFunction;
  });

  it("contains correct sub-commands", () => {
    expect(playbook.commands).toHaveLength(2);
  })
});