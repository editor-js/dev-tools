import Extension, { Control, Options } from '../dev-stand/src/types/extension';
import * as icons from '@codexteam/icons';

/**
 * Extension for toggle editor.js thin mode
 */
export default class LayoutExtension implements Extension {
  /**
   * Extension options, which consist of editor.js and stand API instance
   */
  public readonly options: Options;

  /**
   * Constructor for layout extension
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
      icon: icons.IconCollapse,
      title: 'Thin Mode',
      onActivate: () => {
        this.options.stand.editorWrapper.classList.toggle('thin');
        this.options.stand.reinitEditor();
      },
    };
  }

  /**
   * Get extension styles for editor.js wrapper
   */
  public get styles(): string {
    return `.thin { max-width: 400px;
                      margin: 0 auto;
                      border-left: 1px solid #eee;
                      border-right: 1px solid #eee;}`;
  }
}