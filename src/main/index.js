import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
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
    width: 700,
    height: 500,
    autoHideMenuBar: true,
    useContentSize: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
    app.exit()
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
    width: 700,
    height: 500,
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
  console.log('parsing request :', arg)
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
    console.log('rendering url ', currentProcessing.url)
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
