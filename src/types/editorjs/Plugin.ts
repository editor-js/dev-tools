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
}

/**
 * Class for editor.js plugins
 */
export class Plugin extends InstallableTool {
  /**
   * Initiate editor.js plugin
   *
   * @param {Options} options - plugin options.
   * @param {string} options.name - plugin name.
   * @param {string} options.packageName - plugin package name.
   * @param {string} options.path - plugin local or CDN path.
   * @param {string} options.version - plugin version in registry.
   */
  constructor({ name, packageName, path, version }: Options) {
    super(name, packageName, path, version);
  }
}