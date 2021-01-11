import { FileConstants } from "../../../../../../../../../constants";
import { Command } from "../../../../../../../../../extensions";
import { BacklogItemTemplate, ServiceCollection } from "../../../../../../../../../models";
import { emptyBacklogItemTemplate, exampleBacklogItemTemplate } from "../../../../../../../../../samples";
import { Logger } from "../../../../../../../../../utils";

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
    const { backlogItemStorageService } = serviceCollection;

    const templates: BacklogItemTemplate[] = [exampleBacklogItemTemplate, emptyBacklogItemTemplate];

    const { template: templateName, outFile } = options;
    const template = templates.find((t) => t.name === templateName);

    if (!template) {
      Logger.log(`Could not find template ${templateName}.`);
    } else {
      backlogItemStorageService.write(outFile ?? FileConstants.backlogItemsFileName, template);
    }
  });
