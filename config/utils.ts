import * as fs from 'fs'
import * as path from 'path'
const appDirectory = fs.realpathSync(process.cwd())

export const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
