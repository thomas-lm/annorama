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
        ipcRenderer.send('render-url-error', error)
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
  let container = document.querySelector('.annoncesListeBien')
  let items = container.querySelectorAll('.annonce')
  let response = []
  items.forEach(element => {
    if(element.querySelector('a') && element.querySelector('.contentAnnonce')) {
      // Get url from source
      let initUrl = element.querySelector('a').getAttribute('href')
      let itemUrl = initUrl

      // Remove last / if exist
      if (itemUrl.lastIndexOf('/') === itemUrl.length - 1) {
        itemUrl = itemUrl.substring(0, itemUrl.lastIndexOf('/') - 1)
      }

      // get ID first div
      let itemId = element.querySelector('.contentAnnonce').getAttribute('data-uid')

      // image
      let itemImage = element.querySelector('img')
      let imageFileName = undefined
      if (itemImage) {
        urlImage = itemImage.getAttribute('src')
        imageFileName = ipcRenderer.sendSync('download-required-sync', window.location.protocol + '//' + window.location.hostname + urlImage)
      }

      response.push({
        uid: itemId,
        mainImageFileName: imageFileName,
        title: element.querySelector('.zone-text-loupe .detail_vignette').textContent,
        price: element.querySelector('.price').textContent,
        link: window.location.hostname + initUrl,
        lastUpdate: new Date(),
        creationDate: new Date()
      })
    }
  })
  return response
}