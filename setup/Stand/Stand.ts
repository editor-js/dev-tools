import { Core } from '../types/editorjs/Core.js';
import * as path from 'path';
import { InstallableTool, SourceType } from '../types/editorjs/InstallableTool.js';
import { Plugin } from '../types/editorjs/Plugin.js';
import FileData from '../utils/FileData.js';

// Templates for html and script files
const STAND_TEMPLATE = path.resolve('./build/dev-stand/src/templates/stand-template.html');
const STAND_SCRIPT_TEMPLATE = path.resolve('./build/dev-stand/src/templates/stand-template.js');

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
    for (const [index, plugin] of plugins.entries()) {
      /**
       * Check if plugin is from CDN
       */
      if (plugin.sourceType === SourceType.CDN && plugin.path) {
        /**
         * Add plugin script to index.html
         */
        this.addScript(plugin.path, false);
      } else {
        const toolClassName = `Tool${index}`;

        this.addImportToScript(plugin, toolClassName);
      }
    }

    this.addPluginsToEditorConfig();

    /**
     * Add editor.js core initiation to script
     */
    this.JSData.insert(`\teditor = new ${coreClassName}(editorConfig)`, '/// {{{ Core initialization }}}');

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
     * Write file data to index.html, stand.js and stand.css files
     */
    this.HTMLFileData.saveFile('./dev-stand/' + indexName);
    this.JSData.saveFile('./dev-stand/' + bundleName);
  }

  /**
   * Add script to index.html file
   *
   * @param {string} scriptPath - script path
   * @param {boolean} isModule - is script has type module
   */
  private addScript(scriptPath: string, isModule = true): void {
    const script =`<script src="${scriptPath}" ${isModule ? `type="module"`: ``}></script>`;

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
      /**
       * Set version to latest if it is not set
       */
      const version = tool.version ? `${tool.version}` : 'latest';

      importSource = `https://cdn.skypack.dev/${tool.packageName}@${version}`;
    }

    /**
     * Make named import if tool has export name
     */
    if (tool.exportName != 'default') {
      className = `{ ${className} }`;
    }

    const str = `import ${className} from '${importSource}'`;

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
     * Add plugins to tools object
     */
    for (const [index, plugin] of this.plugins.entries()) {
      /**
       * Get tool key
       */
      const toolName = plugin.name;

      let className: string;

      /**
       * Set class name to plugin export name if it is not default
       */
      if (plugin.exportName != 'default') {
        className = plugin.exportName;
      } else {
        className = `Tool${index}`;
      }

      /**
       * Add tool to tools object in editorConfig
       */
      const data = `tools.push({ key: '${toolName}', class: ${className} });`;

      this.JSData.insert(data, '// {{{ Tools configuration }}}');
    }
  }
}