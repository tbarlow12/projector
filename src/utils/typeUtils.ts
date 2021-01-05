/**
 * Helper class to determine types of objects at runtime
 */
export class TypeUtils {
  /**
   * Indicates whether or not an object is of type ProviderConfig
   *
   * @param {any} config Config object
   * @returns {boolean} True if object is of type ProviderConfig
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  public static isProviderConfig(config: any): boolean {
    return config && !!config.providerName;
  }
}
