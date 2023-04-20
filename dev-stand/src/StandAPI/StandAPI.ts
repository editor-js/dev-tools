/**
 * Class for stand API, which is used to interact with Stand
 */
export default class StandAPI {
  /**
   * Editor.js wrapper
   */
  public editorWrapper: HTMLDivElement;

  /**
   * Constructor for stand API
   *
   * @param {string} holder - editor.js holder name
   */
  constructor(holder: string) {
    this.editorWrapper = document.getElementById(holder) as HTMLDivElement;
  }
}