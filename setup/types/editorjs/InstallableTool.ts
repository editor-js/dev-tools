import { execSync } from 'child_process';
import * as path from 'path';
import FileData from '../../utils/FileData.js';

/**
 * Enum for source type of tool
 */
export enum SourceType {
  /**
   * Get tool by local path
   */
  Path = 'path',
  /**
   * Get tool by CDN link
   */
  CDN = 'cdn',

  /**
   * Get tool by registry
   */
  Registry = 'registry',
}

/**
 * Class for tools, which can be installed, contains installation methods and properties
 */
export class InstallableTool {
  /**
   * Tool name
   */
  public readonly name: string;
  /**
   * Tool package name
   */
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
   * Tool export name
   */
  public exportName: string;

  /**
   * Initiate installable tool
   *
   * @param {string} name - tool name.
   * @param {string} exportName - tool export class name.
   * @param {string} packageName - tool package name.
   * @param {string} toolPath - tool local or CDN path.
   * @param {string} version - tool version in registry.
   */
  constructor(name: string, exportName: string, packageName?: string, toolPath?: string, version?: string) {
    this.name = name;
    this.packageName = packageName;
    this.exportName = exportName;

    this.sourceType = InstallableTool.getSourceType(toolPath);

    /**
     * Check if source type is path and convert bundle to esm
     */
    if (this.sourceType === SourceType.Path && toolPath) {
      this.path = InstallableTool.convertBundleToESM(path.resolve(toolPath), name);
    } else {
      this.path = toolPath;
    }

    this.version = version;
  }

  /**
   * Convert bundle to esm
   *
   * @param {string} bundlePath - bundle path
   * @param {string} toolName - tool name
   * @returns {string} - path to esm bundle
   */
  public static convertBundleToESM(bundlePath: string, toolName: string): string {
    /**
     * Create tmp folder for esm bundles
     */
    const folderPath = FileData.createFolder('./tmp');

    /**
     * Path for esm bundle
     */
    const ESMBundlePath = `${folderPath}/${toolName}.js`;

    /**
     * Build esm bundle
     */
    execSync(`esbuild ${bundlePath} --format=esm --outfile=${ESMBundlePath} --allow-overwrite`);

    return bundlePath;
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

    /**
     * Check if tool path is url or local path
     */
    if (toolPath) {
      if (!urlRegex.test(toolPath)) {
        return SourceType.Path;
      }

      return SourceType.CDN;
    }

    return SourceType.Registry;
  }
}