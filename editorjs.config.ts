export default function config(){

    return {
        setup: {
            packageManager: 'npm',
            core: {
                version: '2.26.5'
            },
            tools: [
                {name: 'raw'},
                {name: 'table', version: '2.2.0'}
            ]
        }
    }
}