import StandAPI from '../StandAPI/StandAPI';
import EditorJS from '@editorjs/editorjs';

/**
 * Extension control interface
 */
export interface Control {
    /**
     * Icon for extension
     */
    icon: string;
    /**
     * Title for extension
     */
    title: string;
    /**
     * Function to activate extension
     */
    onActivate: () => void;
}

/**
 * Extension options interface
 */
export interface Options {
    /**
     * Editor.js instance
     */
    editor: EditorJS,

    /**
     * Stand API instance
     */
    stand: StandAPI,
}

/**
 * Extension interface
 */
export default interface Extension {
    /**
     * Extension options
     */
    options: Options;

    /**
     * Getter for extension control
     */
    readonly control: Control;
    /**
     * Getter for extension styles for editor.js wrapper
     */
    readonly styles?: string;
}
