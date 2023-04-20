import ReadOnlyExtension from './extensions/ReadOnly.js';

/**
 * Create editor.js dev-tools config
 *
 * @returns {unknown} - editor.js dev-tools config
 */
export default function config(): unknown {
  return {
    setup: {
      packageManager: 'yarn',
      core: {
        version: '2.26.5',
      },
      tools: {
        raw: '@editorjs/raw',
        table: {
          name: '@editorjs/table',
          version: '~2.2.0',
        },
        code: '@editorjs/code',
        quote: '@editorjs/quote',
        header: '@editorjs/header',
        checklist: {
          path: './checklist/dist/bundle.js',
        },
      },
    },
    extensions: [ ReadOnlyExtension ],
    editorConfig: {
      tools: {
        quote: {
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
          shortcut: 'CMD+SHIFT+O',
        },
      },
      data: {
        blocks: [
          {
            id: 'zcKCF1S7X8',
            type: 'header',
            data: {
              text: 'Editor.js',
              level: 1,
            },
          },
        ],
      },
    },
  };
}
