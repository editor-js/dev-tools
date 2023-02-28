/**
 * Enum for source type of tool
 */
export enum SourceType {
    Registry = 'registry',
    Path = 'path'
}

/**
 * Interface for installable tool
 */
export interface InstallableTool {
    /**
     * Tool name
     */
    readonly name: string;
    /**
     * Tool version in registry
     */
    readonly version?: string;
    /**
     * Tool source type
     */
    readonly sourceType: SourceType;
    /**
     * Tool path (local or CDN)
     */
    readonly path?: string;
    /**
     * Identify tool source type
     *
     * @param path - tool path
     * @returns {SourceType} - tool source type
     */
    checkSourceType(path?: string): SourceType;
}