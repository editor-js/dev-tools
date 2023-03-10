import { Core } from '../editorjs/Core.js';
import * as fs from 'fs';
import * as path from 'path';
import { InstallableTool } from '../editorjs/InstallableTool';
import { Plugin } from '../editorjs/Plugin';

const STAND_TEMPLATE = path.resolve('./src/types/stand/stand.template');

/**
 * Class for development stan
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
   * Data for index.html
   */
  private file: string;

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
    this.file = fs.readFileSync(STAND_TEMPLATE, 'utf-8');

    /**
     * Make tools array with core and plugins
     */
    const tools = plugins;

    tools.push(core);

    this.addScripts(tools);

    /**
     * Write file data to index.html file
     */
    fs.writeFileSync(path.resolve('index.html'), this.file);
  }

  /**
   * Add scripts to index.html fite
   *
   * @param {Array<InstallableTool>} tools - tools to add
   */
  private addScripts(tools: Array<InstallableTool>): void {
    /**
     * Identify tag, after which are added scripts and its position
     */
    const findTag = '<body>';
    const tagIndex = this.file.indexOf(findTag);

    /**
     * Get two parts of file by slicing by tag position
     */
    const fileRest = this.file.slice(tagIndex + findTag.length);

    this.file = this.file.slice(0, tagIndex + findTag.length);

    /**
     * Add scripts of all tools to the file
     */
    for (const tool of tools) {
      this.file = this.file + `\n<script src="${tool.path}"></script>`;
    }

    /**
     * Concatenate file parts
     */
    this.file = this.file + fileRest;
  }
}