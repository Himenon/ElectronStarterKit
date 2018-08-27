import * as path from 'path'
import * as webpack from 'webpack'
import * as commonConfig from './config/common'
import { plugins } from './config/plugins'
import { rules as defaultRules } from './config/rules'
import { resolveApp } from './config/utils'

const module: webpack.Configuration[] = [
    // main processのscript
    {
        entry: resolveApp('src/main/app.ts'),
        target: 'electron-main',
        output: {
            path: resolveApp('dist'),
            filename: 'main.js',
        },
        module: {
            rules: [defaultRules.sourceMapLoader, defaultRules.tsLoader],
        },
        resolve: {
            extensions: commonConfig.extensions,
            alias: commonConfig.alias,
        },
    },
    // rendererで利用するscript。entryはwindowの種類の数だけある
    {
        entry: {
            index: resolveApp('src/renderer/windows/main.tsx'),
            sub: resolveApp('src/renderer/windows/sub.tsx'),
        },
        target: 'electron-renderer',
        devtool: 'cheap-module-source-map',
        output: {
            // publicPath: '/',
            chunkFilename: '[name].chunk.js',
            filename: '[name]-renderer.js',
            pathinfo: true,
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        },
        module: {
            rules: [defaultRules.sourceMapLoader, defaultRules.tsLoader, defaultRules.htmlLoader, defaultRules.urlLoader, defaultRules.styleLoader],
        },
        plugins,
        resolve: {
            extensions: commonConfig.extensions,
            alias: commonConfig.alias,
        },
        node: commonConfig.nodepPolyfill,
    },
]

export default module
