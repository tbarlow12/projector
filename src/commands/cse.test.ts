import { cse } from "./cse";

describe("CSE Command", () => {
  it("contains correct sub-commands", () => {
    expect(cse.commands).toHaveLength(4);
  });
});
