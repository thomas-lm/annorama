import { BrowserWindow, ipcMain, app, remote } from 'electron'
import path from 'path'
import http from 'http'
import https from 'https'
import fs from 'fs'
import { APP_IMAGE_STORE_DIR } from '../constantes.js'

let userImagesStoragePath
if (app === undefined) {
  userImagesStoragePath = path.join(remote.app.getPath('userData'), APP_IMAGE_STORE_DIR)
} else {
  userImagesStoragePath = path.join(app.getPath('userData'), APP_IMAGE_STORE_DIR)
}

// Create directory
if (!fs.existsSync(userImagesStoragePath)) {
  // console.log('create directory ', userImagesStoragePath)
  fs.mkdirSync(userImagesStoragePath)
}

const parsers = [
  { file: 'leboncoin.js', imageDirName: 'leboncoin', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}leboncoin\.fr\/recherche\/.*$/ },
  { file: 'ouestfranceimmo.js', imageDirName: 'ouestfranceimmo', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}ouestfrance-immo\.com\/(louer|acheter)\/.*$/ },
  { file: 'orpi.js', imageDirName: 'orpi', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}orpi\.com\/recherche\/.*$/ },
  { file: 'iadfrance.js', imageDirName: 'iadfrance', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}iadfrance\.fr\/rechercher\/.*$/ },
  { file: 'century21.js', imageDirName: 'century21', urlRegexp: /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}century21\.fr\/annonces\/.*$/ }
]

/**
 * Main entry point to parse url
 */
ipcMain.on('parse-url', (e, url, suid) => {
  let found = false
  // Detect if a parser exist for this url
  parsers.forEach(aParser => {
    if (found === false && aParser.urlRegexp.test(url)) {
      // Found a parser
      found = true
      parseUrl(aParser, url, suid, e.sender)
    }
  })
  if (found === false) {
    console.log('no parser found')
    e.sender.send('parse-url-reply-' + suid, {
      error: 'no parser found'
    })
  }
})

/**
 * initialise and add to queue the url to parse
 */
function parseUrl (parser, url, suid, sender) {
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
  parser.processingQueue.push({ url, suid, sender })
}

/**
 * Processing the queue
 */
function parserProcessing (parser) {
  if (parser.currentProcessing === undefined && parser.processingQueue.length > 0) {
    parser.currentProcessing = parser.processingQueue.shift()
    parser.currentProcessing.startDate = new Date()
    console.log('processing ', parser.file, parser.currentProcessing.url, parser.currentProcessing.suid)
    // parser.processingWindow.show()
    parser.processingWindow.loadURL(parser.currentProcessing.url)
  } else if (parser.currentProcessing !== undefined) {
    // Timeout if > 30s
    if (new Date().getTime() - parser.currentProcessing.startDate.getTime() > 30000) {
      parser.currentProcessing.sender.send('parse-url-reply-' + parser.currentProcessing.suid, { error: 'parsing timeout' })
      parser.processingWindow.hide()
      parser.currentProcessing = undefined
    }
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
    parser.currentProcessing.sender.send('parse-url-reply-' + parser.currentProcessing.suid, source)
    parser.processingWindow.hide()
    parser.currentProcessing = undefined
  } else {
    console.log('error no parser init')
  }
})

ipcMain.on('render-url-error', (e, error) => {
  console.log('render-error', error)
  let parser = getCurrentParserOfType(e.sender.webContents.parserType)
  if (parser && parser.currentProcessing) {
    e.sender.send('render-url-error-reply')
    parser.currentProcessing.sender.send('parse-url-reply-' + parser.currentProcessing.suid, { error: error })
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
 * Download image for item sync
 */
ipcMain.on('download-required-sync', (e, url) => {
  console.log('download required for ', e.sender.webContents.parserType, url)
  let parser = getCurrentParserOfType(e.sender.webContents.parserType)
  if (parser && parser.currentProcessing) {
    const basePath = path.join(userImagesStoragePath, parser.imageDirName)
    // Create directory
    if (!fs.existsSync(basePath)) {
      console.log('create directory ', basePath)
      fs.mkdirSync(basePath)
    }
    const filename = url.substring(url.lastIndexOf('/') + 1)
    const filePath = path.join(basePath, filename)

    const file = fs.createWriteStream(filePath)

    if (url.startsWith('https')) {
      https.get(url, function (response) {
        response.pipe(file)
      })
    } else {
      http.get(url, function (response) {
        response.pipe(file)
      })
    }
    e.returnValue = path.join(parser.imageDirName, filename)
  } else {
    console.log('error no parser init')
  }
  e.returnValue = ''
})

ipcMain.on('count-processing', (e) => {
  let num = 0
  parsers.forEach(aParser => {
    if (aParser.currentProcessing) {
      num++
    }
    if (aParser.processingQueue) {
      num += aParser.processingQueue.length
    }
  })
  e.sender.send('count-processing-reply', num)
})
