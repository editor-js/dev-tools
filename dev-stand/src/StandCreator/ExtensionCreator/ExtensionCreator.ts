import Extension from '../../types/extension';

/**
 * Class for adding extension to stand
 */
export default class ExtensionCreator {
  /**
   * Extension instance
   */
  public readonly extension: Extension;

  /**
   * Constructor for stand extension
   *
   * @param extension - extension instance
   */
  constructor(extension: Extension) {
    this.extension = extension;
  }

  /**
   * Get CSS classes for stand extension
   */
  private static getCSS(): {[key: string]: string} {
    return {
      devStandExtensionButton: `dev-stand__extensions-button`,
      devStandExtensionButtonActive: `dev-stand__extensions-button--active`,
      devStandExtensionItem: `dev-stand__extensions-item`,
      devStandExtensions: `dev-stand__extensions`,

    };
  }

  /**
   * Add extension to stand
   */
  public add(): void {
    this.addExtensionStyles();

    /**
     * Create elements for extension
     */
    const btn = this.createExtensionButton();
    const title = this.createExtensionTitle();
    const container = this.createExtensionContainer();

    /**
     * Append button and title to extension container
     */
    container.appendChild(title);
    container.appendChild(btn);

    /**
     * Append extension container to extensions
     */
    const extensionsContainer = document.getElementsByClassName(ExtensionCreator.getCSS().devStandExtensions)[0];

    if (extensionsContainer) {
      extensionsContainer.appendChild(container);
    }
  }

  /**
   * Add extension styles to stand
   */
  private addExtensionStyles(): void {
    if (!this.extension.styles) {
      return;
    }
    const styleElement = document.createElement('style');

    styleElement.textContent += this.extension.styles;
    document.head.appendChild(styleElement);
  }

  /**
   * Create extension toggle button
   */
  private createExtensionButton(): HTMLButtonElement {
    const button = document.createElement('button');

    button.innerHTML = this.extension.control.icon;
    button.addEventListener('click', () => {
      this.extension.control.onActivate();
      button.classList.toggle(ExtensionCreator.getCSS().devStandExtensionButtonActive);
    });
    button.classList.add(ExtensionCreator.getCSS().devStandExtensionButton);

    return button;
  }

  /**
   * Create container for extension
   */
  private createExtensionContainer(): HTMLDivElement {
    const container = document.createElement('div');

    container.classList.add(ExtensionCreator.getCSS().devStandExtensionItem);

    return container;
  }

  /**
   * Create extension title
   */
  private createExtensionTitle(): HTMLDivElement {
    const title = document.createElement('div');

    title.innerHTML = this.extension.control.title;

    return title;
  }
}