import { pjr } from "./pjr";

describe("PJR Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(pjr.commands).toHaveLength(4);
  });
});
