import { InstallableTool, SourceType } from './installableTool.js';

/**
 * Class for editor.js core
 */
export class Core implements InstallableTool {
  /**
   * Core name
   */
  public readonly name: string;
  /**
   * Source type of core, by path(link) of registry
   */
  public readonly sourceType: SourceType;
  /**
   * Core version in registry
   */
  public readonly version?: string;
  /**
   * Core local path or CDN link
   */
  public readonly path?: string;

  /**
   * Initiate editor.js core
   *
   * @param {string} name - core name.
   * @param {string} path - core local or CDN path.
   * @param {string} version - core version in registry.
   */
  constructor(name: string, path?: string, version?: string) {
    this.name = name;
    this.path = path;
    this.version = version;
    this.sourceType = this.checkSourceType(path);
  }

  /**
   * Identify core source type
   *
   * @param {string} path - core local or CDN path.
   * @returns {SourceType} - core source type
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