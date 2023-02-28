import { Config } from './types/config.js';
import { PackageInstaller } from './utils/packageInstaller.js';
import config from '../editorjs.config.js';
import { z } from 'zod';
import { SourceType } from './types/editorjs/installableTool.js';
import { Plugin } from './types/editorjs/plugin.js';
import { Core } from './types/editorjs/core.js';

/**
 * Class editor.js dev tools
 *
 * @property {Plugin} core - editor.js core
 * @property {Array<Plugin>} plugins - list of editor.js plugins
 * @property {Config} parsedConfig - parsed 'editorjs.config.ts'
 * @property {PackageInstaller} installer - util for installing packages
 */
class DevTools {
  public readonly core: Core;
  public readonly plugins: Array<Plugin>;
  private readonly parsedConfig: z.infer<typeof Config>;
  private readonly installer: PackageInstaller;

  /**
   * Initiate editor.js dev tools
   */
  constructor() {
    this.parsedConfig = Config.parse(config());
    this.installer = new PackageInstaller(this.parsedConfig.setup.packageManager);
    this.plugins = [];

    // Get core path and version from config
    const corePath = this.parsedConfig.setup.core.path;
    const coreVersion = this.parsedConfig.setup.core.version;

    this.core = new Core('@editorjs/editorjs', corePath, coreVersion);

    const tools = this.parsedConfig.setup.tools;

    // Check if tools in config
    if (tools) {
      for (const toolItem of tools) {
        let tool: Plugin;

        // Check is tool in config is string or object
        if (typeof toolItem === 'string') {
          tool = new Plugin(toolItem);
        } else {
          tool = new Plugin(toolItem.name, toolItem.path, toolItem.version);
        }

        this.plugins.push(tool);
      }
    }
  }

  /**
   * Create editor.js workspace
   */
  public createWorkspace(): void {
    // Check for source type of core and install it
    if (this.core.sourceType === SourceType.Registry) {
      // Install editor.js by version
      this.installer.installPackage(this.core.name, this.core.version);
    }

    // Check for source type and install all tools
    for (const tool of this.plugins) {
      if (tool.sourceType === SourceType.Registry) {
        this.installer.installPackage(tool.name, tool.version);
      }
    }
  }
}

const devTools = new DevTools();

devTools.createWorkspace();