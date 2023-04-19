import config from './editorjs.config';
import StandAPI from './src/stand/StandAPI/StandAPI';

// {{{ Tools }}}

const editorConfig = config().editorConfig;
const extensions = config().extensions;

if (typeof editorConfig.tools === 'undefined') {
    editorConfig.tools = {}
}

// {{{ Tools configuration }}}

// {{{ Core }}}

const standAPI = new StandAPI('editorjs');

/**
 * Create style element to add styles from extensions
 */
const styleElement = document.createElement('style');

/**
 * Iterate over all extensions
 */
for (const extensionClass of extensions) {
    /**
     * Create extension
     */
    const extension = new extensionClass(editor, standAPI);

    /**
     * If extension has styles, add them to the stand
     */
    if (extension.styles) {
        styleElement.textContent += extension.styles;
    }

    /**
     * Create button to toggle extension
     */
    const btn = document.createElement('button');
    btn.addEventListener('click', () => {
        extension.control.onActivate();
        btn.classList.toggle('dev-stand__extensions-button--active');
    });
    btn.innerHTML = extension.control.icon;
    btn.classList.add('dev-stand__extensions-button');

    /**
     * Create container for extension
     */
    const extensionContainer = document.createElement('div');
    extensionContainer.classList.add('dev-stand__extensions-item');

    /**
     * Add title to the extension
     */
    const extensionTitle = document.createElement('div');
    extensionTitle.innerText = extension.control.title;

    /**
     * Append extension to the stand
     */
    extensionContainer.appendChild(extensionTitle);
    extensionContainer.appendChild(btn);
    document.querySelector('.dev-stand__extensions').appendChild(extensionContainer);
}
document.head.appendChild(styleElement);


