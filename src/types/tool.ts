/**
 * Enum for source type of tool
 */
enum SourceType {
  NPM = 'npm',
  PATH = 'path'
}

/**
 * Class for editorjs tools
 */
export class Tool {
  public readonly name: string;
  public readonly sourceType: SourceType;
  public readonly version?: string;
  public readonly path?: string;

  /**
   * Initiate tool
   *
   * @param {string} name - tool name.
   * @param {string} path - tool local or CDN path.
   * @param {string} version - tool version in npm.
   */
  constructor(name: string, path?: string, version?: string) {
    this.name = name;
    this.path = path;
    this.version = version;
    this.sourceType = this.checkSourceType(path);
  }

  /**
   * Identify tool source type
   *
   * @param {string} path - tool local or CDN path.
   * @returns {SourceType} - tool source type
   */
  private checkSourceType(path?: string): SourceType {
    let sourceType: SourceType;

    // Check if path exists
    if (path) {
      sourceType = SourceType.PATH;

      return sourceType;
    }

    sourceType = SourceType.NPM;

    return sourceType;
  }
}