import { EditorConfig, ToolConstructable } from '@editorjs/editorjs';
import Extension from '../types/extension';
import ExtensionCreator from './ExtensionCreator/ExtensionCreator';

/**
 * Tool interface
 */
interface Tool {
    /**
     * Tool key
     */
    key: string;

    /**
     * Tool class instance
     */
    class: ToolConstructable;
}

/**
 * Class for creating stand
 */
export default class StandCreator {
  /**
   * Editor.js config
   */
  private readonly editorConfig: EditorConfig;

  /**
   * Editor.js tools
   */
  private readonly tools: Array<Tool>;

  /**
   * Constructor for stand creator
   *
   * @param editorConfig - editor.js config
   * @param tools - editor.js tools
   */
  constructor(editorConfig: EditorConfig, tools: Array<Tool>) {
    this.editorConfig = editorConfig;
    this.tools = tools;
  }

  /**
   * Get CSS classes for stand
   */
  private static getCSS(): {[key: string]: string} {
    return {
      devStandContent: 'dev-stand__content',
    };
  }

  /**
   * Add tools to editor config
   */
  public addToolsToEditorConfig(): void {
    /**
     * Check if tools object exists in editor config
     */
    if (!this.editorConfig.tools) {
      /**
       * If not, create it
       */
      this.editorConfig.tools = {};
    }

    /**
     * Add tools to editor config
     */
    for (const tool of this.tools) {
      /**
       * Check if tool exists in editor config
       */
      if (!this.editorConfig.tools[tool.key]) {
        /**
         * If not, create it
         */
        this.editorConfig.tools[tool.key] = {};
      }

      /**
       * Add tool class to editor config
       */
      this.editorConfig.tools[tool.key] = {
        class: tool.class,
      };
    }
  }

  /**
   * Add editor.js holder to stand
   *
   * @returns {HTMLElement} - editor.js holder element
   */
  public addEditorHolder(): HTMLElement {
    /**
     * Check if holder exists in editor config
     */
    const holder = this.editorConfig.holder ? this.editorConfig.holder : 'editorjs';

    let editorHolder: HTMLElement;

    /**
     * Check type of holder
     */
    if (holder instanceof HTMLElement) {
      editorHolder = holder;
    } else {
      /**
       * Create new element for holder
       */
      editorHolder = document.createElement('div');
      editorHolder.id = holder;
    }

    /**
     * Add holder to stand content
     */
    document.getElementsByClassName(StandCreator.getCSS().devStandContent)[0].appendChild(editorHolder);

    return editorHolder;
  }

  /**
   * Add extensions to stand
   *
   * @param extensions - extensions' instances to add
   */
  public addExtensions(extensions: Array<Extension>): void {
    for (const extension of extensions) {
      const extensionCreator = new ExtensionCreator(extension);

      extensionCreator.add();
    }
  }
}