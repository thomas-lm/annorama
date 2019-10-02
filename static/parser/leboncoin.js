const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {

  let iframeRecapcha = document.querySelector('iframe[src*="captcha"]')

  if (iframeRecapcha) {
    console.log('asking for captcha')
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
        console.log(error)
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
  let items = document.querySelectorAll('li[itemtype="http://schema.org/Offer"]')
  let response = []
  items.forEach(element => {
    // Get url from source
    let initUrlA = element.querySelector('a')
    if (initUrlA) {
      let initUrl = initUrlA.getAttribute('href')
      let itemUrl = initUrl

      // Remove last / if exist
      if (itemUrl.lastIndexOf('/') === itemUrl.length - 1) {
        itemUrl = itemUrl.substring(0, itemUrl.lastIndexOf('/') - 1)
      }

      // get ID from url
      let itemId = itemUrl.substring(itemUrl.lastIndexOf('/') + 1, itemUrl.lastIndexOf('.'))

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
        title: element.querySelector('span[itemprop="name"]').textContent,
        price: element.querySelector('span[itemprop="priceCurrency"]').textContent,
        link: window.location.hostname + initUrl,
        lastUpdate: new Date(),
        creationDate: new Date()
      })
    }
  })
  return response
}