import { cse } from "./cse";

describe("CSE Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(cse.commands).toHaveLength(4);
  });
});
