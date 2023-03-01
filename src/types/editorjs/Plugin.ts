import { InstallableTool } from './installableTool.js';

/**
 * Class for editor.js plugins
 */
export class Plugin extends InstallableTool {
  /**
   * Initiate editor.js plugin
   *
   * @param {string} name - plugin name.
   * @param {string} path - plugin local or CDN path.
   * @param {string} version - plugin version in registry.
   */
  constructor(name: string, path?: string, version?: string) {
    super(name, path, version);
  }
}