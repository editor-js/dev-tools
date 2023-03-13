import { Core } from '../types/editorjs/Core';
import * as path from 'path';
import { InstallableTool } from '../types/editorjs/InstallableTool';
import { Plugin } from '../types/editorjs/Plugin';
import FileData from '../utils/FileData.js';

const STAND_TEMPLATE = path.resolve('./src/stand/stand.html');

/**
 * Stand is the ...
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
     * Make tools array with core and plugins
     */
    const tools = plugins;

    tools.push(core);

    this.addScripts(tools);

    /**
     * Write file data to index.html file
     */
    this.HTMLFileData.saveFile('index.html');
  }

  /**
   * Add scripts to index.html file
   *
   * @param {Array<InstallableTool>} tools - tools to add
   */
  private addScripts(tools: Array<InstallableTool>): void {
    let scripts = '';

    /**
     * Add scripts of all tools to the file
     */
    for (const tool of tools) {
      scripts +=`\n<script src="${tool.path}"></script>`;
    }

    this.HTMLFileData.insert(scripts, '<body>');
  }
}