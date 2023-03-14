import { InstallableTool } from './installableTool.js';


/**
 * Class for editor.js core
 */
export class Core extends InstallableTool {
  /**
   * Editor.js core configuration
   */
  public readonly editorConfig: unknown;

  /**
   * Initiate editor.js core
   *
   * @param {string} name - core name.
   * @param {unknown} editorConfig - core configuration
   * @param {string} path - core local or CDN path.
   * @param {string} version - core version in registry.
   */
  constructor(name: string, editorConfig: unknown = {}, path?: string, version?: string) {
    super(name, path, version);
    this.editorConfig = editorConfig;
  }
}