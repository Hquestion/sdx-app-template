module.exports = {
    presets: [
        '@vue/app',
        '@babel/flow'
    ],
    sourceType: 'unambiguous',
    plugins: [
        [
            'component-customize',
            {
                "libraryName": "@sdx/ui",
                "styleCustomize": true
            }
        ],
        [
            'component-customize',
            {
                "libraryName": "@sdx/widget",
                "styleCustomize": true
            },
            '@sdx/widget'
        ],
        [
            'component-customize',
            {
                "libraryName": "element-ui",
                "styleCustomize": true
            },
            'element-ui'
        ]
    ]
};
