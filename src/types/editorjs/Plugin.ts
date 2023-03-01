import { InstallableTool, SourceType } from './installableTool.js';

/**
 * Class for editor.js plugins
 */
export class Plugin implements InstallableTool {
  /**
   * Plugin name
   */
  public readonly name: string;
  /**
   * Source type of plugin, by path(link) or registry
   */
  public readonly sourceType: SourceType;
  /**
   * Plugin version in registry
   */
  public readonly version?: string;
  /**
   * Plugin local path or CDN link
   */
  public readonly path?: string;

  /**
   * Initiate editor.js plugin
   *
   * @param {string} name - plugin name.
   * @param {string} path - plugin local or CDN path.
   * @param {string} version - plugin version in registry.
   */
  constructor(name: string, path?: string, version?: string) {
    this.name = name;
    this.path = path;
    this.version = version;
    this.sourceType = this.checkSourceType(path);
  }

  /**
   * Identify plugin source type
   *
   * @param {string} path - plugin local or CDN path.
   * @returns {SourceType} - plugin source type
   */
  public checkSourceType(path?: string): SourceType {
    let sourceType: SourceType;

    // Check if path exists
    if (path) {
      sourceType = SourceType.Path;

      return sourceType;
    }

    sourceType = SourceType.Registry;

    return sourceType;
  }
}