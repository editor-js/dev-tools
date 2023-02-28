import { Config } from './types/config.js';
import { PackageInstaller } from './utils/packageInstaller.js';
import config from '../editorjs.config.js';
import { z } from 'zod';
import { SourceType, Tool } from './types/tool.js';

/**
 * Class editor.js dev tools
 *
 * @property {Tool} core - editor.js core
 * @property {Array<Tool>} tools - list of editor.js plugins
 * @property {Config} parsedConfig - parsed 'editorjs.config.ts'
 * @property {PackageInstaller} installer - util for installing packages
 */
class DevTools {
  public readonly core: Tool;
  public readonly tools: Array<Tool>;
  private readonly parsedConfig: z.infer<typeof Config>;
  private readonly installer: PackageInstaller;

  /**
   * Initiate editor.js dev tools
   */
  constructor() {
    this.parsedConfig = Config.parse(config());
    this.installer = new PackageInstaller(this.parsedConfig.setup.packageManager);
    this.tools = [];

    // Get core path and version from config
    const corePath = this.parsedConfig.setup.core.path;
    const coreVersion = this.parsedConfig.setup.core.version;

    this.core = new Tool('@editorjs/editorjs', corePath, coreVersion);

    const tools = this.parsedConfig.setup.tools;

    // Check if tools in config
    if (tools) {
      for (const toolItem of tools) {
        let tool: Tool;

        // Check is tool in config is string or object
        if (typeof toolItem === 'string') {
          tool = new Tool(toolItem);
        } else {
          tool = new Tool(toolItem.name, toolItem.path, toolItem.version);
        }

        this.tools.push(tool);
      }
    }
  }

  /**
   * Create editor.js workspace
   */
  public createWorkspace(): void {
    // Check for source type of core and install it
    if (this.core.sourceType === SourceType.REMOTE) {
      // Install editor.js by version
      this.installer.installPackage(this.core.name, this.core.version);
    }

    // Check for source type and install all tools
    for (const tool of this.tools) {
      if (tool.sourceType === SourceType.REMOTE) {
        this.installer.installPackage(tool.name, tool.version);
      }
    }
  }
}

const devTools = new DevTools();

devTools.createWorkspace();