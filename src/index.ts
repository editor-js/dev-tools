import { Config } from './types/config.js';
import { PackageInstaller } from './utils/PackageInstaller.js';
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
   * Util for installing packages
   *
   * @private
   */
  private readonly installer: PackageInstaller;

  /**
   * Initiate editor.js dev tools
   *
   * @param configData - dev tools configuration
   */
  constructor(configData: unknown) {
    this.parsedConfig = Config.parse(configData);
    this.installer = new PackageInstaller(this.parsedConfig.setup.packageManager);
    this.plugins = [];

    /**
     * Get core path, version and package name from config
     */
    const corePath = this.parsedConfig.setup.core.path;
    const coreVersion = this.parsedConfig.setup.core.version;
    const corePackageName = this.parsedConfig.setup.core.name;

    this.core = new Core('core', corePackageName, corePath, coreVersion);

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
            });
          } else {
            /**
             * Tool source is registry
             */
            tool = new Plugin({
              name: toolName,
              packageName: sourceConfig.name,
              version: sourceConfig.version,
            });
          }
        } else {
          /**
           * Tool source is package name without version
           */
          tool = new Plugin({ name: toolName,
            packageName: sourceConfig,
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
