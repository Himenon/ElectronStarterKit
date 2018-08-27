import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import * as webpack from 'webpack'
import { resolveApp } from './utils'

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const plugins: webpack.Plugin[] = [
    new TsconfigPathsPlugin({
        configFile: resolveApp('tsconfig.json'),
    }),
    // ts-loader | tslint を別プロセスで動かす
    new ForkTsCheckerWebpackPlugin({
        async: true,
        watch: resolveApp('src'),
        tsconfig: resolveApp('tsconfig.json'),
        tslint: resolveApp('tslint.json'),
    }) as any,
    // https://github.com/jantimon/html-webpack-plugin/issues/218
    new HtmlWebpackPlugin({
        chunks: ['index'],
        template: './src/assets/index.html',
        filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
        chunks: ['sub'],
        template: './src/assets/sub.html',
        filename: 'sub.html',
    }),
    new MiniCssExtractPlugin({
        filename: 'stylesheets/[name].css',
    }),
]
