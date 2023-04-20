import config from '../editorjs.config';
import StandAPI from './src/StandAPI/StandAPI';
import StandExtension from "./src/StandExtension/StandExtension";

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
 * Iterate over all extensions
 */
for (const extensionClass of extensions) {
    const extension = new extensionClass(editor, standAPI);
    const standExtension = new StandExtension(extension);
    standExtension.addExtensionToStand();
}


