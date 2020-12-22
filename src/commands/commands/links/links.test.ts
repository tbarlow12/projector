import { links } from "./links";

describe("Project Init Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(links.commands).toHaveLength(3);
  });
});
