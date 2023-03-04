import { InstallableTool } from './installableTool.js';
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

/**
 * Class for editor.js plugins
 */
export class Plugin extends InstallableTool {
  /**
   * Plugin configuration
   */
  public readonly pluginConfig: ToolConstructable | ToolSettings;

  /**
   * Initiate editor.js plugin
   *
   * @param {string} name - plugin name.
   * @param {ToolConstructable | ToolSettings} pluginConfig - plugin configuration
   * @param {string} path - plugin local or CDN path.
   * @param {string} version - plugin version in registry.
   */
  constructor(name: string, pluginConfig: ToolConstructable | ToolSettings, path?: string, version?: string) {
    super(name, path, version);
    this.pluginConfig = pluginConfig;
  }
}