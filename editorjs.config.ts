export default function config() {

    return {
        setup: {
            packageManager: 'yarn',
            core: {
                version: '2.26.0'
            },
            tools: [
                ['@editorjs/raw', {raw: { inlineToolbar: true }}]
            ]
        },
        editorConfig: {
            readOnly: false,
            holder: 'editorjs',
        }
    }
}


