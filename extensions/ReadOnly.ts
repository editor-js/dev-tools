import EditorJS from '@editorjs/editorjs';
import StandAPI from '../src/Stand/StandAPI/StandAPI';
import Extension, { Control } from '../src/types/extension';

/**
 * Extension for toggle read only mode
 */
export default class ReadOnlyExtension implements Extension {
  /**
   * Editor.js instance
   */
  public readonly editor: EditorJS;
  /**
   * Stand API with editor.js wrapper
   */
  public readonly stand: StandAPI;
  /**
   * Extension config
   */
  public readonly config: unknown;

  /**
   * Constructor for read only extension
   *
   * @param {EditorJS} editor - editor.js instance
   * @param {StandAPI} stand - stand API instance
   * @param {unknown} config - extension config
   */
  constructor(editor: EditorJS, stand: StandAPI, config: unknown) {
    this.editor = editor;
    this.stand = stand;
    this.config = config;
  }

  /**
   * Get extension control
   */
  public get control(): Control {
    return {
      icon: '🔒',
      title: 'Read Only',
      onActivate: () => {
        this.editor.readOnly.toggle();
      },
    };
  }
}