import config from '../editorjs.config';
import StandAPI from './src/StandAPI/StandAPI';
import StandCreator from "./src/StandCreator/StandCreator";

// {{{ Tools }}}

let editorConfig = config().editorConfig;
const extensions = config().extensions;

const tools = [];
// {{{ Tools configuration }}}

const standCreator = new StandCreator(editorConfig, tools);
standCreator.addToolsToEditorConfig();
const editorHolder = standCreator.addEditorHolder();

/**
 * Create empty extensionOptions object
 */
let extensionOptions = {};

let editor;

/**
 * Create editor
 * @param {EditorConfig} config - Editor configuration to overwrite default configuration
 */
const createEditor = (config = {}) => {
  editorConfig = Object.assign(editorConfig, config);
    /// {{{ Core initialization }}}
  extensionOptions.editor = editor;
}

/**
 * Create editor instance
 */
createEditor();

/**
 * Reinitialize editor
 * @param {EditorConfig} config - Editor configuration to overwrite default configuration
 */
const reinitEditor = (config = {}) => {
  editor.destroy();
  createEditor(config);
}

const standAPI = new StandAPI({
  editorHolder,
  reinitEditor
});

/**
 * Set standAPI to extensionOptions
 */
extensionOptions.stand = standAPI;

/**
 * Create extensions' instances
 */
const standExtensions = extensions.map((extensionClass) => new extensionClass(extensionOptions));

standCreator.addExtensions(standExtensions);
