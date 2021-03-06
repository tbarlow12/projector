import { Guard } from "./guard";

describe("Guard", () => {
  it("throws an error for an empty string with default message", () => {
    // Setup
    const name = "empty";

    // Act & Assert
    expect(() => Guard.empty("", name)).toThrowError(`Argument '${name}' cannot be empty`);
  });

  it("throws an error for an empty string with specified message", () => {
    // Setup
    const message = "this is empty";

    // Act & Assert
    expect(() => Guard.empty("", "empty", message)).toThrowError(message);
  });

  it("throws an error for a null value with default message", () => {
    // Setup
    const name = "null";

    // Act & Assert
    expect(() => Guard.null(null, name)).toThrowError(`Argument '${name}' cannot be null`);
  });

  it("throws an error for an empty string with specified message", () => {
    // Setup
    const message = "this is null";

    // Act & Assert
    expect(() => Guard.null(null, "empty", message)).toThrowError(message);
  });
});
