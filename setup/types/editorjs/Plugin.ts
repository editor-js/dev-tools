import { InstallableTool } from './installableTool.js';

/**
 * Interface for plugin class options
 */
interface Options {
  /**
   * Plugin name
   */
  name: string;
  /**
   * Plugin package name
   */
  packageName?: string;
  /**
   * Plugin path (local or CDN)
   */
  path?: string;
  /**
   * Plugin version in registry
   */
  version?: string;
  /**
   * Plugin export class name
   */
  exportName: string;
}

/**
 * Class for editor.js plugins
 */
export class Plugin extends InstallableTool {
  /**
   * Initiate editor.js plugin
   *
   * @param {Options} options - plugin options.
   */
  constructor({ name, packageName, path, version, exportName }: Options) {
    super(name, exportName, packageName, path, version);
  }
}