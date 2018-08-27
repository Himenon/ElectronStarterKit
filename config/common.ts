import * as webpack from 'webpack'
import { resolveApp } from './utils'

export const externals: webpack.ExternalsElement | webpack.ExternalsElement[] = {
    electron: 'require("electron")',
    net: 'require("net")',
    remote: 'require("remote")',
    shell: 'require("shell")',
    app: 'require("app")',
    ipc: 'require("ipc")',
    fs: 'require("fs")',
    buffer: 'require("buffer")',
    system: '{}',
    file: '{}',
}

export const extensions: string[] = ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx']

export const alias: { [key: string]: string } = {
    '@components': resolveApp('src/renderer/components/index.ts'),
    '@containers': resolveApp('src/renderer/containers/index.ts'),
    '@modules': resolveApp('src/renderer/modules/index.ts'),
    '@stores': resolveApp('src/renderer/stores/index.ts'),
    '@abstract': resolveApp('src/renderer/abstract/index.ts'),
    '@repository': resolveApp('src/renderer/repository/index.ts'),
    '@utils': resolveApp('src/renderer/utils/index.ts'),
    '@application': resolveApp('src/renderer/application/index.ts'),
    '@config': resolveApp('src/renderer/config/index.ts'),
    '@events': resolveApp('src/renderer/events/index.ts'),
    '@plugins': resolveApp('src/renderer/plugins/index.ts'),
    '@share': resolveApp('src/share/index.ts'),
}

export const nodepPolyfill: webpack.Node | false = {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    __dirname: false,
    __filename: false,
}
