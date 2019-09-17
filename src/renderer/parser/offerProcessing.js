/**
 * Process of sorting, new offer with older
 * Update offers and project sources status
 */
import {parseSearchUrl} from 'itemParser.js'

function refreshProject (currentProject) {
  return new Promise(async (resolve) => {
    let newOffers = []
    let newSources = []
    for (const [uid, source] of Object.entries(currentProject.sources)) {
      // TODO Gérer la parralelisation
      try {
        let offers = await parseSearchUrl(source)
        newSources[uid] = {
          uid: uid,
          url: source.url,
          lastRequest: new Date(),
          itemNumber: offers.length,
          error: undefined
        }
        // add source uid to prefix of offer uid
        newOffers.push(offers.map((nof) => {
          nof[uid] = source.uid + '-' + nof[uid]
          return nof
        }))
      } catch (e) {
        newSources[uid] = {
          uid: uid,
          url: source.url,
          lastRequest: new Date(),
          itemNumber: 0,
          error: e
        }
      }
    }

    // TODO Gérer les anciens
    // TODO Suppression des anciens non sourcé
    // TODO Trier les résultats
    // TODO Gérer les fusions
    resolve(newSources, newOffers)
  })
}

export default { refreshProject }
