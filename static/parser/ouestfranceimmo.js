const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {

  let iframeRecapcha = document.querySelector('iframe[src*="captcha"]')

  if (iframeRecapcha) {
    ipcRenderer.send('user-interact-required')
  } else {
    ipcRenderer.once('render-url-reply', () => {
      console.log('reply to renderer')
    })
    ipcRenderer.once('render-url-error-reply', () => {
      console.log('reply to renderer-error')
    })
    //Load all image with scroll
    scrollDown(30, 30, document.body.scrollHeight, function() {
      try {
        var offers = getOffers()
        ipcRenderer.send('render-url', offers)
      } catch (error) {
        ipcRenderer.send('render-url-error', error.message)
      }
    })
  }
})

function scrollDown(y, dy, max, success) {
  if(y < max) {
    window.scrollTo(0, y)
    setTimeout(function() {
      scrollDown(y + dy, dy, max, success)
    }, 10)
  } else {
    success()
  }
}

/**
 * parse content to get all offer on this page
 */
function getOffers () {
  let items = document.querySelectorAll('#listAnnonces a.annLink')
  let response = []
  items.forEach(element => {
    // Get url from source
    let initUrl = element.getAttribute('href')
    let itemUrl = initUrl

    // Remove last / if exist
    if (itemUrl.lastIndexOf('/') === itemUrl.length - 1) {
      itemUrl = itemUrl.substring(0, itemUrl.lastIndexOf('/') - 1)
    }

    // get ID first div
    let itemId = element.querySelector('div[data-id]').getAttribute('data-id')

    // image
    let itemImage = element.querySelector('img.annPhoto')
    let imageFileName = undefined
    if (itemImage) {
      urlImage = itemImage.getAttribute('data-original')
      imageFileName = ipcRenderer.sendSync('download-required-sync', urlImage)
    }

    response.push({
      uid: itemId,
      mainImageFileName: imageFileName,
      title: element.querySelector('.annTitre').textContent.replace(/\s\s+/g, ' '),
      price: element.querySelector('.annPrix').textContent.replace(/\s\s+/g, ' '),
      link: window.location.hostname + initUrl,
      lastUpdate: new Date(),
      creationDate: new Date()
    })
  })
  return response
}