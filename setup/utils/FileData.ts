import * as fs from 'fs';
import * as path from 'path';

/**
 * Class to work with files
 */
export default class FileData {
  /**
   * Data in file
   */
  public fileData: string;

  /**
   * File to modify
   *
   * @param {string} filePath - path to file
   */
  constructor(filePath: string) {
    this.fileData = fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * Create folder if it doesn't exist
   *
   * @param pathToFolder - path to folder
   * @returns {string} - path to folder
   */
  public static createFolder(pathToFolder: string): string {
    const resolvedPath = path.resolve(pathToFolder);

    /**
     * Check if folder exists
     */
    if (fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }

    /**
     * Create folder
     */
    fs.mkdirSync(resolvedPath);

    return resolvedPath;
  }

  /**
   * Insert data to file
   *
   * @param {string} content - data to insert
   * @param {string} after - substring to insert data after
   */
  public insert(content: string, after?: string): void {
    /**
     * Check if after is not passed
     */
    if (!after) {
      this.fileData += '\n' + content;

      return;
    }

    /**
     * Get index of after substring
     */
    const afterIndex = this.fileData.indexOf(after);

    /**
     * Get two parts of file by slicing by substring position
     */
    const fileRest = this.fileData.slice(afterIndex + after.length);

    this.fileData = this.fileData.slice(0, afterIndex + after.length);

    /**
     * Add content to the file
     */
    this.fileData += '\n' + content;

    this.fileData = this.fileData + fileRest;
  }

  /**
   * Save file
   *
   * @param {string} pathToSave - path to save file
   */
  public saveFile(pathToSave: string): void {
    try {
      fs.writeFileSync(path.resolve(pathToSave), this.fileData);
    } catch (err) {
      console.log(err);
    }
  }
}