import { Core } from '../types/editorjs/Core.js';
import * as path from 'path';
import { InstallableTool, SourceType } from '../types/editorjs/InstallableTool.js';
import { Plugin } from '../types/editorjs/Plugin.js';
import FileData from '../utils/FileData.js';

// Templates for html and script files
const STAND_TEMPLATE = path.resolve('./src/stand/stand-template.html');
const STAND_SCRIPT_TEMPLATE = path.resolve('./src/stand/stand-template.js');

/**
 * Stand is the environment for testing editor.js and its plugins
 */
export default class Stand {
  /**
   * Editor.js core
   */
  public core: Core;

  /**
   * Editor.js plugins
   */
  public plugins: Array<Plugin>;

  /**
   * Data to store into index.html file
   */
  private HTMLFileData: FileData;

  /**
   * Data to store into stand script file with editor.js configuration
   */
  private JSData: FileData;

  /**
   * Initiate stand
   *
   * @param {Core} core - editor.js core
   * @param {Array<Plugin>} plugins - editor.js plugins
   */
  constructor(core: Core, plugins: Array<Plugin>) {
    this.core = core;
    this.plugins = plugins;

    /**
     * Get stand template file
     */
    this.HTMLFileData = new FileData(STAND_TEMPLATE);

    /**
     * Get script template file
     */
    this.JSData = new FileData(STAND_SCRIPT_TEMPLATE);

    const coreClassName = 'Core';

    /**
     * Add core import to script
     */
    this.addImportToScript(core, coreClassName);

    /**
     * Add plugins imports to script
     */
    for (let i = 0; i < plugins.length; i++) {
      const toolClassName = `Tool${i}`;

      this.addImportToScript(plugins[i], toolClassName);
    }

    this.addPluginsToEditorConfig();

    /**
     * Add editor.js core initiation to script
     */
    this.JSData.insert(`\nconst editor = new Core(editorConfig)`);

    /**
     * File names for stand environment
     */
    const bundleName = 'stand.js';
    const indexName = 'index.html';

    /**
     * Add stand.js script to index.html
     */
    this.addScript(bundleName);

    /**
     * Write file data to index.html and stand.js files
     */
    this.HTMLFileData.saveFile(indexName);
    this.JSData.saveFile(bundleName);
  }

  /**
   * Add script to index.html file
   *
   * @param {string} scriptPath - script path
   */
  private addScript(scriptPath: string): void {
    const script =`\n<script src="${scriptPath}" type="module"></script>`;

    this.HTMLFileData.insert(script, '<body>');
  }

  /**
   * Add tool import to script
   *
   * @param {InstallableTool} tool - tool to import
   * @param {string} className - tool class name
   */
  private addImportToScript(tool: InstallableTool, className: string): void {
    let importSource = tool.path;

    /**
     * Set import source to tool name if source type is registry
     */
    if (tool.sourceType === SourceType.Registry) {
      importSource = tool.name;
    }

    const str = `\nimport ${className} from "${importSource}"`;

    /**
     * Regular comment to insert import after it
     */
    const regularComment = '// {{{ Tools }}}';

    this.JSData.insert(str, regularComment);
  }

  /**
   * Add plugins to editorConfig
   *
   */
  private addPluginsToEditorConfig(): void {
    /**
     * Make empty tools object
     */
    this.JSData.insert('\neditorConfig.tools = {};');

    /**
     * Add plugins to tools object
     */
    for (let i = 0; i < this.plugins.length; i++) {
      /**
       * Get plugin name, and split it in case "@editorjs/plugin"
       */
      let toolName = this.plugins[i].name;

      if (toolName.includes('/')) {
        const parts = toolName.split('/');

        toolName = parts[1];
      }

      /**
       * Create plugin object in tools
       */
      this.JSData.insert(`\neditorConfig.tools["${toolName}"] = Tool${i}`);
    }
  }
}