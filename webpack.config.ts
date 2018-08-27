import * as path from 'path'
import * as webpack from 'webpack'
import * as commonConfig from './config/common'
import { plugins } from './config/plugins'
import { rules as defaultRules } from './config/rules'
import { resolveApp } from './config/utils'

const module: webpack.Configuration[] = [
    // main processのscript
    {
        entry: resolveApp('src/main/App.ts'),
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
            preference: resolveApp('src/renderer/windows/preference.tsx'),
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
    // webviewに注入するscriptのbuild
    {
        entry: {
            inject: resolveApp('src/unit/preload.ts'),
        },
        module: {
            rules: [defaultRules.tsLoader],
        },
        externals: commonConfig.externals,
    },
]

export default module
