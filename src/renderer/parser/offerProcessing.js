/**
 * Process of sorting, new offer with older
 * Update offers and project sources status
 */
import { parseSearchUrl } from './itemParser.js'

function refreshSource (source) {
  let newSource = {
    uid: source.uid,
    url: source.url,
    lastRequest: source.lastRequest,
    itemNumber: source.itemNumber,
    error: source.error
  }
  return new Promise((resolve) => {
    parseSearchUrl(source.url).then(values => {
      newSource.lastRequest = new Date()
      newSource.itemNumber = values.length
      newSource.error = ''
      let newOffers = {}
      values.forEach(offer => {
        let nuid = source.uid + '-' + offer.uid
        offer.uid = nuid
        newOffers[nuid] = offer
      })
      resolve({ source: newSource, offers: newOffers })
    }).catch(reason => {
      newSource.error = reason.message
      resolve({ source: newSource, offers: {} })
    })
  })
}

function refreshProject (currentProject) {
  // Instantiate all promise
  let sourcePromises = []
  for (const source of Object.values(currentProject.sources)) {
    sourcePromises.push(refreshSource(source))
  }
  return new Promise((resolve) => {
    Promise.all(sourcePromises).then(function (results) {
      // Merge results
      let newOffers = {}
      let newSources = {}

      for (const result of results) {
        newSources[result.source.uid] = result.source
        for (const offer of Object.values(result.offers)) {
          newOffers[offer.uid] = offer
        }
      }

      // TODO Gérer les anciens
      // TODO Suppression des anciens non sourcé
      // TODO Trier les résultats
      // TODO Gérer les fusions
      resolve([newSources, newOffers])
    }).catch(e => {
      console.log('unexpected error in refreshing project', e)
    })
  })
}

export { refreshProject }
