/**
 * Process of sorting, new offer with older
 * Update offers and project sources status
 */
import { ipcRenderer } from 'electron'

function parseUrlPromise (projectUid, source) {
  let uniqueUid = projectUid + '-' + source.uid
  return new Promise(function (resolve, reject) {
    ipcRenderer.once('parse-url-reply-' + uniqueUid, (event, response) => {
      if (response.error !== undefined) {
        console.log('parseUrlResp error', source, uniqueUid, response.error)
        reject(new Error(response.error))
      } else {
        resolve(response)
      }
    })
    ipcRenderer.send('parse-url', source.url, uniqueUid)
  })
}

function refreshSource (projectUid, source) {
  let newSource = {
    uid: source.uid,
    url: source.url,
    lastRequest: source.lastRequest,
    itemNumber: source.itemNumber,
    parser: 'undefined',
    error: source.error
  }
  return new Promise((resolve) => {
    parseUrlPromise(projectUid, newSource).then(response => {
      let values = response.source
      newSource.lastRequest = new Date()
      newSource.itemNumber = values.length
      newSource.parser = response.parserName
      newSource.error = ''
      let newOffers = {}
      values.forEach(offer => {
        // offer tranformation
        let nuid = source.uid + '-' + offer.uid
        offer.uid = nuid
        // add parser
        offer.parser = response.parserName
        // clean title and price
        offer.title = offer.title.replace(/\s\s+/g, '')
        offer.price = offer.price.replace(/\s\s+/g, '')
        newOffers[nuid] = offer
      })
      resolve({ source: newSource, offers: newOffers })
    }).catch(reason => {
      newSource.error = reason.message
      resolve({ source: newSource, offers: {} })
    })
  })
}

function refreshProject (currentProject, uidSource) {
  // Instantiate all promise
  let sourcePromises = []
  for (const source of Object.values(currentProject.sources)) {
    if (uidSource === undefined || source.uid === uidSource) {
      sourcePromises.push(refreshSource(currentProject.uid, source))
    }
  }
  return new Promise((resolve) => {
    Promise.all(sourcePromises).then(function (results) {
      // console.log('all promise result', results)
      // Merge results
      let newOffers = {}
      let newSources = {}

      for (const result of results) {
        newSources[result.source.uid] = result.source
        for (const offer of Object.values(result.offers)) {
          newOffers[offer.uid] = offer
        }
      }
      resolve([newSources, newOffers])
    }).catch(e => {
      console.log('unexpected error in refreshing project', e)
    })
  })
}

function countProcessing () {
  // console.log('ask for count processing')
  return new Promise(function (resolve) {
    ipcRenderer.once('count-processing-reply', (event, response) => {
      resolve(response)
    })
    ipcRenderer.send('count-processing')
  })
}

export { refreshProject, countProcessing }
