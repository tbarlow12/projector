import { SimulatedStorageService } from "./simulatedStorageService";

describe("File Storage Service", () => {
  const simulatedStorageService = new SimulatedStorageService<SimpleType>();

  interface SimpleType {
    name: string;
  }

  const sampleObject: SimpleType = { name: "zach" };

  beforeAll(async () => {
    await simulatedStorageService.write("/path/to/file.json", sampleObject);
  });

  it("parses a file", async () => {
    // Act
    const json = await simulatedStorageService.read("file.json", "/path/to/");

    // Assert
    expect(json).toEqual(sampleObject);
  });

  it("writes a file", async () => {
    // Setup
    const newFile = "new.json";
    const newContent: SimpleType = { name: "zach again" };

    // Act
    const wrote = await simulatedStorageService.write(newFile, newContent);

    // Assert
    expect(wrote).toBe(true);
  });

  it("finds a file", async () => {
    const file = "file.json";

    const found = await simulatedStorageService.find(file, "/path/to/the/file/but/it/is/really/long");

    expect(found).toBe(sampleObject);
  });
});
