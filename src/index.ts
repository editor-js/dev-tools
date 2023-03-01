import { Config } from './types/config.js';
import { PackageInstaller } from './utils/PackageInstaller.js';
import config from '../editorjs.config.js';
import { z } from 'zod';
import { SourceType } from './types/editorjs/installableTool.js';
import { Plugin } from './types/editorjs/Plugin.js';
import { Core } from './types/editorjs/Core.js';

/**
 * Class editor.js dev tools
 */
class DevTools {
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
     * Get core path and version from config
     */
    const corePath = this.parsedConfig.setup.core.path;
    const coreVersion = this.parsedConfig.setup.core.version;

    this.core = new Core('@editorjs/editorjs', corePath, coreVersion);

    this.addTools();
  }

  /**
   * Create editor.js workspace
   */
  public createWorkspace(): void {
    /**
     * Check for source type of core and install it
     */
    if (this.core.sourceType === SourceType.Registry) {
      /**
       * Install editor.js by version
       */
      this.installer.installPackage(this.core.name, this.core.version);
    }

    /**
     * Check for source type and install all tools
     */
    for (const tool of this.plugins) {
      if (tool.sourceType === SourceType.Registry) {
        this.installer.installPackage(tool.name, tool.version);
      }
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
         * Check is tool in config is string or object
         */
        if (typeof toolItem === 'string') {
          tool = new Plugin(toolItem);
        } else {
          tool = new Plugin(toolItem.name, toolItem.path, toolItem.version);
        }

        this.plugins.push(tool);
      }
    }
  }
}

const devTools = new DevTools();

devTools.createWorkspace();