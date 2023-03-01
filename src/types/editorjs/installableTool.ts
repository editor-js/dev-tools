import {PackageInstaller} from "../../utils/PackageInstaller";

/**
 * Enum for source type of tool
 */
export enum SourceType {
    /**
     * Tool installs from registry
     */
    Registry = 'registry',
    /**
     * Get tool by local path or CDN link
     */
    Path = 'path'
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
    readonly path?: string;

    /**
     * Identify tool source type
     *
     * @param path - tool path
     * @returns {SourceType} - tool source type
     */
    private getSourceType(path?: string): SourceType {
        /**
         * Check if path exists
         */
        if (path) {

            return  SourceType.Path;
        }

        return  SourceType.Registry;
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
        if (this.sourceType === SourceType.Registry) {
            packageInstaller.installPackage(this.name, this.version);
        }
    }

    /**
     * Initiate installable tool
     *
     * @param {string} name - tool name.
     * @param {string} path - tool local or CDN path.
     * @param {string} version - tool version in registry.
     */
    constructor(name: string, path?: string, version?: string) {
        this.name = name;
        this.path = path;
        this.version = version;
        this.sourceType = this.getSourceType(path);
    }
}