import { execSync } from 'child_process';

/**
 * Enum for package managers
 */
export enum PackageManager {
  NPM = 'npm',
  YARN = 'yarn'
}

/**
 * Class for npm packages installation
 */
export class PackageInstaller {
  /**
   * Type of package manager
   *
   * @private
   */
  private readonly packageManager: PackageManager;

  /**
   * Initiate package installer
   *
   * @param {PackageManager} packageManager - package manager for installation (default is npm).
   */
  constructor(packageManager?: PackageManager) {
    if (packageManager) {
      this.packageManager = packageManager;
    } else {
      this.packageManager = PackageManager.NPM;
    }
  }

  /**
   * Initiate package installer
   *
   * @param {string} name - package name.
   * @param {string} version - package version
   */
  public installPackage(name: string, version?: string): void {
    let packageString;

    /**
     * Check if version exists
     */
    if (version) {
      packageString = `${name}@${version}`;
    } else {
      /**
       * Latest version of package
       */
      packageString = name;
    }

    try {
      /**
       * Check what package manager uses
       */
      switch (this.packageManager) {
        case PackageManager.NPM:
          execSync(`npm install -E ${packageString}`, { stdio: 'inherit' });
          break;
        case PackageManager.YARN:
          execSync(`yarn add ${packageString}`, { stdio: 'inherit' });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
