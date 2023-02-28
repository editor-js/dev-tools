import { InstallableTool, SourceType } from './installableTool.js';

/**
 * Class for editor.js core
 *
 * @property {string} name - core name
 * @property {SourceType} sourceType - source type of core, by path(link) of npm
 * @property {string} version - core version in registry
 * @property {string} path - core local path or CDN link
 */
export class Core implements InstallableTool {
  public readonly name: string;
  public readonly sourceType: SourceType;
  public readonly version?: string;
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