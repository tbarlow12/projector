import { Link } from "../models";
import { Command } from "./command";
jest.mock("chalk");
import chalk from "chalk";

jest.mock("figlet");
import figlet from "figlet";

describe("Command", () => {
  const originalLogFunction = console.log;
  
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalLogFunction;
  });

  it("calls initialize action", () => {
    // Setup
    const initializeAction = jest.fn();

    // Act
    new Command()
      .initialize(initializeAction)
      .parse();

    // Assert
    expect(initializeAction).toBeCalled();
  });

  it("executes multiple actions", () => {
    // Setup
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();

    new Command()
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parse();
    
    expect(action1).toBeCalled();
    expect(action2).toBeCalled();
    expect(action3).toBeCalled();
  });

  it("executes multiple actions with options", () => {
    // Setup
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();
    const optionValue = "optionValue";

    // Act
    new Command()
      .option("-m, --my-option <my-option>", "My option")
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parse(["node.exe", "index.js", "commandName", "--my-option", optionValue]);

    // Assert
    const expectedParsedOptions = {
      myOption: optionValue,
    };
    
    expect(action1).toBeCalledWith(expectedParsedOptions, expect.anything());
    expect(action2).toBeCalledWith(expectedParsedOptions, expect.anything());
    expect(action3).toBeCalledWith(expectedParsedOptions, expect.anything());
  });

  it("prints help information", () => {
    // Act
    new Command()
      .printHelp()
      .parse();

    // Assert
    const { calls } = (console.log as any).mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toContain("Options:\n  -h, --help  display help for command");
  });

  it("prints ascii art", () => {
    // Setup
    const originalText = "text";
    const figletText = "figlet text";
    figlet.textSync = jest.fn(() => figletText);
    const chalkText = "chalk text";
    (chalk as any).cyanBright = jest.fn(() => chalkText);
    
    // Act
    new Command()
      .asciiArt(originalText)
      .parse();

    // Assert
    expect(figlet.textSync).toBeCalledWith(originalText);
    expect((chalk as any).cyanBright).toBeCalledWith(figletText);
    expect(console.log).toBeCalledWith(chalkText);
  });

  it("adds link commands", () => {
    // Setup
    const links: Link[] = [1, 2, 3].map((num: number) => {
      return {
        name: `my name ${num}`,
        description: `my description ${num}`,
        url: `https://${num}.com`,
      };
    });

    // Act
    const command = new Command()
      .addLinkCommands(links);

    // Assert
    expect(command.commands).toHaveLength(links.length);
  });
});
