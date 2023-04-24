import config from '../editorjs.config';
import StandAPI from './src/StandAPI/StandAPI';
import StandCreator from "./src/StandCreator/StandCreator";

// {{{ Tools }}}

const editorConfig = config().editorConfig;
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

/**
 * Create editor
 * @param {EditorConfig} config - Editor configuration to overwrite default configuration
 */
const createEditor = (config = {}) => {
    /// {{{ Core initialization }}}
}

const standAPI = new StandAPI({ 
  editorHolder, 
  reinitEditor: createEditor
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
