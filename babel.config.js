const componentDevEnv = !!require('./package.json').componentDevEnv;
const config = {
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

if (process.env.NODE_ENV === 'development' && componentDevEnv) {
    config.plugins = [
        [
            'component-customize',
            {
                "libraryName": "@sdx/ui",
                "styleCustomize": true,
            },
            '@sdx/ui'
        ],
        [
            'component-customize',
            {
                "libraryName": "@sdx/widget",
                "styleCustomize": true,
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
}

module.exports = config;
