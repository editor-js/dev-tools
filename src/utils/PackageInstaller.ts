import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

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
   * @returns {string | undefined} - package bundle path, undefined, when there were some problems with reading bundle file path
   */
  public installPackage(name: string, version?: string): string | undefined {
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

    /**
     * Get installed package path
     */
    const packagePath = `./node_modules/${name}/`;

    try {
      /**
       * Read package.json file of package
       */
      const packageJson = fs.readFileSync(`./node_modules/${name}/package.json`, 'utf-8');
      const packageJsonObject = JSON.parse(packageJson);

      /**
       * Get bundle path
       */
      return path.join(packagePath, packageJsonObject['main']);
    } catch (err) {
      console.log(err);

      return;
    }
  }
}
