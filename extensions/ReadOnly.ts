import Extension, { Control, Options } from '../dev-stand/src/types/extension';

/**
 * Extension for toggle read only mode
 */
export default class ReadOnlyExtension implements Extension {
  /**
   * Extension options, which consist of editor.js and stand API instance
   */
  public readonly options: Options;

  /**
   * Constructor for read only extension
   *
   * @param options - extension options
   */
  constructor(options: Options) {
    this.options = options;
  }

  /**
   * Get extension control
   */
  public get control(): Control {
    return {
      icon: '🔒',
      title: 'Read Only',
      onActivate: () => {
        this.options.editor.readOnly.toggle();
      },
    };
  }
}