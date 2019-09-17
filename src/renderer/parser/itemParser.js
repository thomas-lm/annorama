import { ipcRenderer } from 'electron'

const files = require.context('./impl', false, /\.js$/)

function parseSearchUrl (url) {
  return new Promise(function (resolve, reject) {
    let done = false
    files.keys().forEach(element => {
      let unParser = require('./impl/' + element.replace('./', ''))
      if (unParser.canParse(url)) {
        done = true
        console.log('parse with ', unParser.name())
        ipcRenderer.once('parse-url-reply', (event, source) => {
          resolve(unParser.parse(source, url))
        })
        ipcRenderer.send('parse-url', url)
      }
    })
    if (!done) {
      reject(new Error('no parser found for this url'))
    }
  })
}

function countRequestProcessing () {
  return ipcRenderer.sendSync('count-processing')
}

export { parseSearchUrl, countRequestProcessing }
