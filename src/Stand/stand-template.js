import config from "./editorjs.config";

// {{{ Tools }}}

const editorConfig = config().editorConfig;

if (typeof editorConfig.tools === 'undefined') {
    editorConfig.tools = {}
}

