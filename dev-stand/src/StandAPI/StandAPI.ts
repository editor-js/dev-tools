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
   * @param {string} editorHolder - editor.js holder element
   */
  constructor(editorHolder: HTMLDivElement) {
    this.editorWrapper = editorHolder;
  }
}