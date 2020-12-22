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
    const initializeAction = jest.fn();
    new Command()
      .initialize(initializeAction)
      .parse();
    expect(initializeAction).toBeCalled();
  });

  it("executes multiple actions", () => {
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
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();

    const optionValue = "optionValue";

    new Command()
      .option("-m, --my-option <my-option>", "My option")
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parse(["node.exe", "index.js", "commandName", "--my-option", optionValue]);

    const expectedParsedOptions = {
      myOption: optionValue,
    };
    
    expect(action1).toBeCalledWith(expectedParsedOptions, expect.anything());
    expect(action2).toBeCalledWith(expectedParsedOptions, expect.anything());
    expect(action3).toBeCalledWith(expectedParsedOptions, expect.anything());
  });

  it("prints help information", () => {
    new Command()
      .printHelp()
      .parse();

    const { calls } = (console.log as any).mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toContain("Options:\n  -h, --help  display help for command");
  });

  it("prints ascii art", () => {
    const originalText = "text";
    const figletText = "figlet text";
    figlet.textSync = jest.fn(() => figletText);
    
    const chalkText = "chalk text";
    (chalk as any).cyanBright = jest.fn(() => chalkText);
    
    new Command()
      .asciiArt(originalText)
      .parse();

    expect(figlet.textSync).toBeCalledWith(originalText);
    expect((chalk as any).cyanBright).toBeCalledWith(figletText);
    expect(console.log).toBeCalledWith(chalkText);
  });

  it("adds link commands", () => {
    const links: Link[] = [1, 2, 3].map((num: number) => {
      return {
        name: `my name ${num}`,
        description: `my description ${num}`,
        url: `https://${num}.com`,
      };
    });
    const command = new Command()
      .addLinkCommands(links);

    expect(command.commands).toHaveLength(links.length);
  });
});
