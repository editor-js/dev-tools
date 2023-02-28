export default function config(){

    return {
        setup: {
            packageManager: 'yarn',
            core: {
                version: '2.26.5'
            },
            tools: [
                '@editorjs/raw',
                {name: '@editorjs/table', version: '~2.2.0'}
            ]
        }
    }
}


