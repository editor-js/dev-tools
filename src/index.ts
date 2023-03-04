import { Config } from './types/config.js';
import { PackageInstaller } from './utils/PackageInstaller.js';
import config from '../editorjs.config.js';
import { z } from 'zod';
import { Plugin } from './types/editorjs/Plugin.js';
import { Core } from './types/editorjs/Core.js';
import { EditorConfig, ToolConstructable, ToolSettings } from '@editorjs/editorjs';

/**
 * Class editor.js dev tools
 */
export class DevTools {
  /**
   * Editor.js core
   */
  public readonly core: Core;
  /**
   * List of editor.js plugins
   */
  public readonly plugins: Array<Plugin>;
  /**
   * Parsed 'editorjs.config.ts'
   */
  private readonly parsedConfig: z.infer<typeof Config>;
  /**
   * Util for installing packages
   *
   * @private
   */
  private readonly installer: PackageInstaller;

  /**
   * Initiate editor.js dev tools
   */
  constructor() {
    this.parsedConfig = Config.parse(config());
    this.installer = new PackageInstaller(this.parsedConfig.setup.packageManager);
    this.plugins = [];

    /**
     * Get core path, version and configuration from config
     */
    const corePath = this.parsedConfig.setup.core.path;
    const coreVersion = this.parsedConfig.setup.core.version;
    const coreConfig = this.parsedConfig.editorConfig as EditorConfig;

    this.core = new Core('@editorjs/editorjs', coreConfig, corePath, coreVersion);

    this.addTools();

    /**
     *  Install core
     */
    this.core.install(this.installer);

    /**
     * Install all tools
     */
    for (const plugin of this.plugins) {
      plugin.install(this.installer);
    }
  }

  /**
   * Add editor.js tools from config
   */
  private addTools(): void {
    const tools = this.parsedConfig.setup.tools;

    /**
     * Check if tools in config
     */
    if (tools) {
      for (const toolItem of tools) {
        let tool: Plugin;

        /**
         * Get tool setup from tuple
         */
        const toolSetup = toolItem[0];
        /**
         * Get tool configuration from tuple
         */
        const toolConfig = toolItem[1] as ToolConstructable | ToolSettings;

        /**
         * Check is tool in config is string or object
         */
        if (typeof toolSetup === 'string') {
          tool = new Plugin(toolSetup, toolConfig);
        } else {
          tool = new Plugin(toolSetup.name, toolConfig, toolSetup.path, toolSetup.version);
        }

        this.plugins.push(tool);
      }
    }
  }
}