'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'
import path from 'path'
import { getAppData, saveAppData } from '../storage.js'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, parserWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: getAppData('windowWidth'),
    height: getAppData('windowHeight'),
    useContentSize: true,
    x: getAppData('windowX'),
    y: getAppData('windowY')
  })

  if (getAppData('windowMaximize') === true) {
    mainWindow.maximize()
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
    app.exit()
  })

  mainWindow.on('move', (e) => {
    saveAppData('windowX', mainWindow.getPosition()[0])
    saveAppData('windowY', mainWindow.getPosition()[1])
  })

  createParsingWindow()
}

/**
 * Create new window for reading the sourceCode of
 * remote pages.
 */
function createParsingWindow () {
  // Create the browser window.
  parserWindow = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.resolve(__static, 'preload.js')
    }
  })

  if (!process.env.IS_TEST) parserWindow.webContents.openDevTools()

  parserWindow.on('close', function (e) {
    e.preventDefault()
    parserWindow.hide()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

var parserEventList = []
var currentProcessing

/**
 * Add in request queue
 */
ipcMain.on('parse-url', (e, arg) => {
  parserEventList.unshift({url: arg, ipcEvent: e})
})

/**
 * Request queue processor
 */
var requestQueueProcessor = function () {
  if (currentProcessing === undefined && parserEventList.length > 0) {
    currentProcessing = parserEventList.pop()
    console.log('requesting url ', currentProcessing.url)
    parserWindow.show()
    parserWindow.loadURL(currentProcessing.url)
  }
  setTimeout(requestQueueProcessor, 1000)
}
requestQueueProcessor()

/**
 * Process response from browser window
 */
ipcMain.on('render-url', (e, source) => {
  if (currentProcessing !== undefined) {
    e.sender.send('render-url-reply')
    currentProcessing.ipcEvent.sender.send('parse-url-reply', source)
    parserWindow.hide()
    currentProcessing = undefined
  }
})

ipcMain.on('count-processing', (e) => {
  console.log('count...')
  e.returnValue = parserEventList.length + 1
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
