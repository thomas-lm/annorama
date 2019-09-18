/**
 * Process of sorting, new offer with older
 * Update offers and project sources status
 */
import { parseSearchUrl } from './itemParser.js'

function refreshSource (source) {
  return new Promise((resolve) => {
    parseSearchUrl(source.url).then(values => {
      source.lastRequest = new Date()
      source.itemNumber = values.length
      source.error = ''
      let newOffers = {}
      values.forEach(offer => {
        let nuid = source.uid + '-' + offer.uid
        offer.uid = nuid
        newOffers[nuid] = offer
      })
      resolve({source, newOffers})
    }).catch(reason => {
      console.log('error for source ', source, reason)
      source.error = reason.message
      resolve([source, {}])
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
    Promise.all(sourcePromises).then(function (values) {
      // Merge results
      let newOffers = {}
      let newSources = {}

      for (const [source, offers] of values) {
        newSources[source.uid] = source
        offers.forEach(offer => {
          newOffers[offer.uid] = offer
        })
      }

      // TODO Gérer les anciens
      // TODO Suppression des anciens non sourcé
      // TODO Trier les résultats
      // TODO Gérer les fusions
      resolve(values)
    }).catch(e => {
      console.log('unexpected error in refreshing project', e)
    })
  })
}

export { refreshProject }
