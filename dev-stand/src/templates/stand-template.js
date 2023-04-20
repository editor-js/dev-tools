import config from '../editorjs.config';
import StandAPI from './src/StandAPI/StandAPI';
import StandExtension from './src/StandExtension/StandExtension';

// {{{ Tools }}}

const editorConfig = config().editorConfig;
const extensions = config().extensions;

if (typeof editorConfig.tools === 'undefined') {
    editorConfig.tools = {}
}

const devStandContentClass = 'dev-stand__content';

/**
 * Check if holder is set in config
 */
const editorHolderId = editorConfig.holder ? editorConfig.holder : 'editorjs';

/**
 * Create holder for editor
 */
const editorHolder = document.createElement('div');
editorHolder.id = editorHolderId;

/**
 * Append holder to dev-stand
 */
const devStandContent = document.querySelector(`.${devStandContentClass}`);
devStandContent.appendChild(editorHolder);

// {{{ Tools configuration }}}

// {{{ Core }}}

const standAPI = new StandAPI(editorHolder);

/**
 * Iterate over all extensions
 */
for (const extensionClass of extensions) {
    const extension = new extensionClass(editor, standAPI);
    const standExtension = new StandExtension(extension);
    standExtension.addExtensionToStand();
}


