import { EditorConfig } from '@editorjs/editorjs';

/**
 * Method for reiniting editor.js instance
 *
 * @param {EditorConfig} config - editor.js configuration to overwrite default one
 */
type ReinitEditorMethod = (config?: EditorConfig) => void;

/**
 * Interface for stand API
 */
interface Options {
  /**
   * Editor.js holder element
   */
  editorHolder: HTMLDivElement;

  /**
   * Method for reiniting editor.js instance
   */
  reinitEditor: ReinitEditorMethod;
}

/**
 * Class for stand API, which is used to interact with Stand
 */
export default class StandAPI {
  /**
   * Editor.js wrapper
   */
  public editorWrapper: HTMLDivElement;

  /**
   * Method for reiniting editor.js instance
   */
  public reinitEditor: ReinitEditorMethod;

  /**
   * Constructor for stand API
   *
   * @param options - stand API options
   */
  constructor({ editorHolder, reinitEditor }: Options) {
    this.editorWrapper = editorHolder;
    this.reinitEditor = reinitEditor;
  }
}