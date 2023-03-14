import { InstallableTool } from './installableTool.js';

/**
 * Class for editor.js plugins
 */
export class Plugin extends InstallableTool {
  /**
   * Plugin configuration
   */
  public readonly pluginConfig: unknown;

  /**
   * Initiate editor.js plugin
   *
   * @param {string} name - plugin name.
   * @param {unknown} pluginConfig - plugin configuration
   * @param {string} path - plugin local or CDN path.
   * @param {string} version - plugin version in registry.
   */
  constructor(name: string, pluginConfig: unknown, path?: string, version?: string) {
    super(name, path, version);
    this.pluginConfig = pluginConfig;
  }
}