import { PackageInstaller } from '../../utils/PackageInstaller.js';
import { execSync } from 'child_process';
import * as path from 'path';

/**
 * Enum for source type of tool
 */
export enum SourceType {
  /**
   * Tool installs from registry
   */
  Registry = 'registry',
  /**
   * Get tool by local path
   */
  Path = 'path',
  /**
   * Get tool by CDN link
   */
  CDN = 'cdn'
}

/**
 * Class for tools, which can be installed, contains installation methods and properties
 */
export class InstallableTool {
  /**
   * Tool name
   */
  public readonly name: string;
  public readonly packageName: string | undefined;
  /**
   * Tool version in registry
   */
  public readonly version?: string;
  /**
   * Tool source type
   */
  public readonly sourceType: SourceType;
  /**
   * Tool path (local or CDN)
   */
  public path?: string;

  /**
   * Initiate installable tool
   *
   * @param {string} name - tool name.
   * @param {string} packageName - tool package name.
   * @param {string} toolPath - tool local or CDN path.
   * @param {string} version - tool version in registry.
   */
  constructor(name: string, packageName?: string, toolPath?: string, version?: string) {
    this.name = name;
    this.packageName = packageName;

    this.sourceType = InstallableTool.getSourceType(toolPath);

    /**
     * Check if source type is path and resolve path
     */
    if (this.sourceType === SourceType.Path && toolPath) {
      this.path = path.resolve(toolPath);
    } else {
      this.path = toolPath;
    }

    this.version = version;
  }

  /**
   * Get source type of tool
   *
   * @param {string} toolPath - passed tool path
   * @returns {SourceType} - source type of tool
   */
  private static getSourceType(toolPath?: string): SourceType {
    /**
     * Regex for url
     */
    const urlRegex = /^https?:\/\//;

    if (toolPath) {
      if (urlRegex.test(toolPath)) {
        return SourceType.CDN;
      }

      return SourceType.Path;
    }

    return SourceType.Registry;
  }

  /**
   * Install tool package
   *
   * @param packageInstaller - installer for packages
   */
  public install(packageInstaller: PackageInstaller): void {
    /**
     * Check if source type is registry and install from it
     */
    if (this.sourceType === SourceType.Registry && this.packageName) {
      this.path = packageInstaller.installPackage(this.packageName, this.version);
    } else if (this.sourceType === SourceType.Path) {
      /**
       * Build esm bundle
       */
      execSync(`esbuild ${this.path} --format=esm --outfile=${this.path} --allow-overwrite`);
    }
  }
}