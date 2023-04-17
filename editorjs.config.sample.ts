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
        warning: {
          path: './warning/dist/bundle.js',
        },
        header: '@editorjs/header',
        image: {
          path: 'https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest',
        },
      },
    },
    editorConfig: {
      inlineToolbar: true,
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

