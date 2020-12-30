import { Template } from ".";

export interface TemplateService {
  /**
   * Gets all templates in the playbook.
   *
   * @returns A list of all templates in the playbook.
   */
  getTemplates: () => Promise<Template[]>;

  /**
   * Gets a template by id from the playbook.
   *
   * @param {string} id The id of the template to get.
   * @returns {Promise<Template | null>} The template if one matched that id.
   * null otherwise.
   */
  getTemplate: (id: string) => Promise<Template | null>;

  /**
   * Saves a template file locally.
   *
   * @param {Template} template The Template to save locally.
   * @param {string} path The local filepath to save the template to.
   * @returns {Promise<boolean>} True if the write was successful, false
   * otherwise.
   */
  writeTemplateToFile: (template: Template, path: string) => Promise<boolean>;
}
