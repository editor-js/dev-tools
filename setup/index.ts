import { Config } from './types/config.js';
import { z } from 'zod';
import { Plugin } from './types/editorjs/Plugin.js';
import { Core } from './types/editorjs/Core.js';
import Stand from './Stand/Stand.js';
import config from '../editorjs.config.js';

/**
 * Class editor.js dev tools
 */
class DevTools {
  /**
   * Development stand
   */
  public stand: Stand;
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
   * Initiate editor.js dev tools
   *
   * @param configData - dev tools configuration
   */
  constructor(configData: unknown) {
    this.parsedConfig = Config.parse(configData);
    this.plugins = [];

    /**
     * Get core path, version, package name and export name from config
     */
    const corePath = this.parsedConfig.setup.core.path;
    const coreVersion = this.parsedConfig.setup.core.version;
    const corePackageName = this.parsedConfig.setup.core.name;
    const coreExportName = this.parsedConfig.setup.core.exportName;

    this.core = new Core('core', coreExportName, corePackageName, corePath, coreVersion);

    this.addTools();

    this.stand = new Stand(this.core, this.plugins);
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
      /**
       * Iterate all tools
       */
      Object.entries(tools).forEach(([toolName, sourceConfig]) => {
        let tool: Plugin;

        /**
         * Check is tool source in config is object or string
         */
        if (typeof sourceConfig === 'object') {
          /**
           * Tool source is path without package name and version
           */
          if ('path' in sourceConfig) {
            tool = new Plugin({
              name: toolName,
              path: sourceConfig.path,
              exportName: sourceConfig.exportName,
            });
          } else {
            /**
             * Tool source is registry
             */
            tool = new Plugin({
              name: toolName,
              packageName: sourceConfig.name,
              version: sourceConfig.version,
              exportName: sourceConfig.exportName,
            });
          }
        } else {
          /**
           * Tool source is package name without version
           */
          tool = new Plugin({ name: toolName,
            packageName: sourceConfig,
            exportName: 'default',
          });
        }
        this.plugins.push(tool);
      });
    }
  }
}

/**
 * Initiate dev tools with config
 */
new DevTools(config());
