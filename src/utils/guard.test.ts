import { Guard } from "./guard";

describe("Guard", () => {
  it("throws an error for an empty string with default message", () => {
    const name = "empty";
    expect(() => Guard.empty("", name)).toThrowError(`Argument '${name}' cannot be empty`)
  });

  it("throws an error for an empty string with specified message", () => {
    const message = "this is empty";
    expect(() => Guard.empty("", "empty", message)).toThrowError(message);
  });
})