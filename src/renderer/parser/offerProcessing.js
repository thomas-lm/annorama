/**
 * Process of sorting, new offer with older
 * Update offers and project sources status
 */
import {parseSearchUrl} from './itemParser.js'

 
function refreshProject (currentProject) {

  return new Promise(async (resolve) => {
  console.log('refreshing project ', currentProject.uid)
  let parsePromise = []
  for (const [uid, source] of Object.entries(currentProject.sources)) {
    parsePromise.push(parseSearchUrl(source.url))
  }//pas possible de gerer les exceptions une a une

  return Promise.all(parsePromise)


  /*
  return new Promise(async (resolve) => {
    let newOffers = {}
    let newSources = {}
    for (const [uid, source] of Object.entries(currentProject.sources)) {
      // TODO Gérer la parralelisation (voir promise.all)
      try {
        let parseSearchUrl = import('./itemParser.js')

        let offers = await parseSearchUrl(source.url)
        newSources[uid] = {
          uid: uid,
          url: source.url,
          lastRequest: new Date(),
          itemNumber: offers.length,
          error: ''
        }
        // add source uid to prefix of offer uid
        offers.forEach(offer => {
          let nuid = source.uid + '-' + offer.uid
          offer.uid = nuid
          newOffers[nuid] = offer
        })
      } catch (e) {
        console.log(e)
        newSources[uid] = {
          uid: uid,
          url: source.url,
          lastRequest: new Date(),
          itemNumber: 0,
          error: e.message
        }
      }
    }

    // TODO Gérer les anciens
    // TODO Suppression des anciens non sourcé
    // TODO Trier les résultats
    // TODO Gérer les fusions
    resolve([newSources, newOffers])
  })*/
}

export default { refreshProject }
