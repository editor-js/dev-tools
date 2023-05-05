import { InstallableTool } from './installableTool.js';

/**
 * Class for editor.js core
 */
export class Core extends InstallableTool {
  /**
   * Initiate editor.js core
   *
   * @param {string} name - core name.
   * @param {string} exportName - core export class name.
   * @param {string} packageName - core package name.
   * @param {string} path - core local or CDN path.
   * @param {string} version - core version in registry.
   */
  constructor(name: string, exportName: string, packageName: string, path?: string, version?: string) {
    super(name, exportName, packageName, path, version);
  }
}