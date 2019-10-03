const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function() {
    ipcRenderer.send('render-url', getOffers())
  }, 500)
})

/**
 * parse content to get all offer on this page
 */
function getOffers () {
  let items = document.querySelectorAll('div[data-component="estate-result"]>div ul:first-child article')
  let response = []
  items.forEach(element => {


    let initUrl = element.querySelector('a').getAttribute('href')
    let itemUrl = initUrl

    // Remove last / if exist
    if (itemUrl.lastIndexOf('/') === itemUrl.length - 1) {
      itemUrl = itemUrl.substring(0, itemUrl.lastIndexOf('/') - 1)
    }

    // get ID first div
    let itemId = element.id

    // image
    let itemImage = element.querySelector('img')
    let imageFileName = undefined
    if (itemImage) {
      urlImage = itemImage.getAttribute('src')
      imageFileName = ipcRenderer.sendSync('download-required-sync', urlImage)
    }

    response.push({
      uid: itemId,
      mainImageFileName: imageFileName,
      title: element.querySelector('a').textContent,
      price: element.querySelector('strong').textContent,
      link: window.location.hostname + initUrl,
      lastUpdate: new Date(),
      creationDate: new Date()
    })
  })
  return response
}