import { FileConstants } from "../../../../../../../../../constants";
import { Command } from "../../../../../../../../../extensions";
import { BacklogItemTemplate, ServiceCollection } from "../../../../../../../../../models";
import { emptyBacklogItemTemplate, exampleBacklogItemTemplate } from "../../../../../../../../../samples";
import { FileUtils } from "../../../../../../../../../utils";

export interface AgileWorkTemplateInitOptions {
  template: string;
  outFile: string;
}

export const agileWorkTemplateInit = new Command()
  .name("init")
  .description("Initialize work item template")
  .option("-t, --template <template>", "Template to use for work items")
  .option("-o, --out-file <out-file>", "Output file for work item template")
  .addAction((serviceCollection: ServiceCollection, options: AgileWorkTemplateInitOptions) => {
    // Stub for now - will fetch templates from repo
    const templates: BacklogItemTemplate[] = [exampleBacklogItemTemplate, emptyBacklogItemTemplate];

    const { template: templateName, outFile } = options;
    const template = templates.find((t) => t.name === templateName);

    if (!template) {
      throw new Error(
        `Could not find template '${templateName}'. Available templates:\n${templates
          .map((temp) => temp.name)
          .join("\n")}`,
      );
    }

    FileUtils.writeFile(outFile || FileConstants.backlogItemsFileName, JSON.stringify(template, null, 4));
  });
