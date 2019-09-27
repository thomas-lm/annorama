import { BrowserWindow, ipcMain } from 'electron'
import path from 'path'

const parsers = [
  { file: 'leboncoin.js', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}leboncoin\.fr\/recherche\/.*$/ },
  { file: 'orpi.js', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}orpi\.com\/recherche\/.*$/ }
]

/**
 * Main entry point to parse url
 */
ipcMain.on('parse-url', (e, url) => {
  console.log('parsing request :', url)
  let found = false
  // Detect if a parser exist for this url
  parsers.forEach(aParser => {
    if (aParser.urlRegexp.test(url)) {
      // Found a parser
      found = true
      parseUrl(aParser, url, e.sender)
    }
  })
  if (found === false) {
    e.sender.send('parse-url-reply', {
      error: 'no parser found'
    })
  }
})

/**
 * initialise and add to queue the url to parse
 */
function parseUrl (parser, url, sender) {
  if (parser.processingWindow === undefined) {
    // Init processing window
    parser.processingWindow = new BrowserWindow({
      width: 400,
      height: 500,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.resolve(__static, 'parser', parser.file),
        devTools: false
      }
    })

    parser.processingWindow.webContents.parserType = parser.file

    parser.processingWindow.on('close', function (e) {
      e.preventDefault()
      parser.processingWindow.hide()
    })
  }

  if (parser.processingQueue === undefined) {
    // Init processing queue
    parser.processingQueue = []
    // Launch process
    parser.processingInterval = setInterval(() => {
      parserProcessing(parser)
    }, 500)
  }

  // add to queue
  parser.processingQueue.push({ url, sender })
}

/**
 * Processing the queue
 */
function parserProcessing (parser) {
  if (parser.currentProcessing === undefined && parser.processingQueue.length > 0) {
    parser.currentProcessing = parser.processingQueue.shift()
    console.log('processing ', parser.file, parser.currentProcessing.url)
    parser.processingWindow.loadURL(parser.currentProcessing.url)
  }
}

/**
 * Return the parser for a type (filename)
 */
function getCurrentParserOfType (type) {
  let response = null
  parsers.forEach(aParser => {
    if (aParser.file === type) {
      response = aParser
    }
  })
  return response
}
/**
 * Response from rendering window
 */
ipcMain.on('render-url', (e, source) => {
  console.log('recieve response from ', e.sender.webContents.parserType)
  let parser = getCurrentParserOfType(e.sender.webContents.parserType)
  if (parser && parser.currentProcessing) {
    e.sender.send('render-url-reply')
    parser.currentProcessing.sender.send('parse-url-reply', source)
    parser.processingWindow.hide()
    parser.currentProcessing = undefined
  } else {
    console.log('error no parser init')
  }
})

/**
 * Rendering window need user action
 */
ipcMain.on('user-interact-required', (e) => {
  console.log('user interaction needed from ', e.sender.webContents.parserType)
  let parser = getCurrentParserOfType(e.sender.webContents.parserType)
  if (parser && parser.currentProcessing) {
    parser.processingWindow.show()
  } else {
    console.log('error no parser init')
  }
})

/**
 * Download image for item
 */
ipcMain.on('download-required', (e, url) => {
  console.log('download required for ', e.sender.webContents.parserType, url)
  let parser = getCurrentParserOfType(e.sender.webContents.parserType)
  if (parser && parser.currentProcessing) {
    parser.processingWindow.show()
  } else {
    console.log('error no parser init')
  }
})
