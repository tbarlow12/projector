import mockFs from "mock-fs";
import { FileStorageService } from "./fileStorageService";

describe("File Storage Service", () => {
  const root = "root";
  const fileStorageService = new FileStorageService<SimpleType>(root);

  interface SimpleType {
    name: string;
  }

  beforeAll(() => {
    mockFs(
      {
        root: {
          // eslint-disable-next-line
          "file.json": "{\"name\": \"jack\"}",
        },
      },
      { createCwd: true, createTmp: true },
    );
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("parses a file", async () => {
    // Act
    const json = await fileStorageService.read("file.json", root);

    // Assert
    expect(json).toEqual({
      name: "jack",
    });
  });

  it("writes a file", async () => {
    // Setup
    const newFile = "new.json";
    const newContent: SimpleType = { name: "zach" };

    // Act
    const wrote = await fileStorageService.write(newFile, newContent);

    // Assert
    expect(wrote).toBe(true);
  });

  it("finds a file", async () => {
    const file = "file.json";

    const found = await fileStorageService.find(file, "root/path/to/the/file/but/it/is/really/long");

    expect(found).toStrictEqual({ name: "jack" });
  });
});
