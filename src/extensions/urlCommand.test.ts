import { Link } from "../models";
import { urlCommand } from "./urlCommand";
jest.mock("open");
import open from "open";

describe("URL Command", () => {
  it("creates a URL command with base path", () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };

    // Act
    urlCommand(link).parse();
    
    // Assert
    expect(open).toBeCalledWith(link.url);
  });

  it("creates a URL command with additional path", () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };
    const urlPath = "/tbarlow12";

    // Act
    urlCommand(link, urlPath).parse();

    // Assert
    expect(open).toBeCalledWith(`${link.url}${urlPath}`);
  });
});
