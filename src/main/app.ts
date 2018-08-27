import { app, BrowserWindow } from 'electron'

let win: Electron.BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })
    win.loadFile('./dist/index.html')
}

app.on('ready', createWindow)
