import { InstallableTool } from './installableTool.js';
import { EditorConfig } from '@editorjs/editorjs';

/**
 * Class for editor.js core
 */
export class Core extends InstallableTool {
  /**
   * Editor.js core configuration
   */
  public readonly editorConfig: EditorConfig;

  /**
   * Initiate editor.js core
   *
   * @param {string} name - core name.
   * @param {EditorConfig} editorConfig - core configuration
   * @param {string} path - core local or CDN path.
   * @param {string} version - core version in registry.
   */
  constructor(name: string, editorConfig: EditorConfig, path?: string, version?: string) {
    super(name, path, version);
    this.editorConfig = editorConfig;
  }
}