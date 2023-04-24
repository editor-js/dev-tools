import { EditorConfig } from '@editorjs/editorjs';

/**
 * Type for createEditor method
 */
type CreateEditorMethod = (config?: EditorConfig) => void;

/**
 * Class for stand API, which is used to interact with Stand
 */
export default class StandAPI {
  /**
   * Editor.js wrapper
   */
  public editorWrapper: HTMLDivElement;

  /**
   * Method for creating editor.js instance
   */
  public createEditor: CreateEditorMethod;

  /**
   * Constructor for stand API
   *
   * @param {string} editorHolder - editor.js holder element
   * @param {CreateEditorMethod} createEditor - method for creating editor.js instances
   */
  constructor(editorHolder: HTMLDivElement, createEditor: CreateEditorMethod) {
    this.editorWrapper = editorHolder;
    this.createEditor = createEditor;
    createEditor();
  }
}