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
  .option(
    "-t, --template <template>",
    "Work item template (run 'pjr agile work template list' to view available templates)",
  )
  .option(
    "-o, --out-file <out-file>",
    "Output file name for initialized work item template. Defaults to using 'backlogItems.json' if not provided",
  )
  .addAction((serviceCollection: ServiceCollection, options: AgileWorkTemplateInitOptions) => {
    // Stub for now - will fetch templates from repo
    const templates: BacklogItemTemplate[] = [exampleBacklogItemTemplate, emptyBacklogItemTemplate];

    const { template: templateName, outFile } = options;
    const template = templates.find((t) => t.name === templateName);

    FileUtils.writeFile(outFile || FileConstants.backlogItemsFileName, JSON.stringify(template, null, 4));
  });
