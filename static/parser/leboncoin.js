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

    ipcRenderer.send('render-url', getOffers())
  }
})

/**
 * parse content to get all offer on this page
 */
function getOffers () {
  let items = document.querySelectorAll('li[itemtype="http://schema.org/Offer"]')
  let response = []
  items.forEach(element => {
    // Get url from source
    let initUrl = element.querySelector('a').getAttribute('href')
    let itemUrl = initUrl

    // Remove last / if exist
    if (itemUrl.lastIndexOf('/') === itemUrl.length - 1) {
      itemUrl = itemUrl.substring(0, itemUrl.lastIndexOf('/'))
    }

    // get ID from url
    let itemId = itemUrl.substring(itemUrl.lastIndexOf('/') + 1, itemUrl.lastIndexOf('.'))

    response.push({
      uid: itemId,
      title: element.querySelector('span[itemprop="name"]').textContent,
      price: element.querySelector('span[itemprop="priceCurrency"]').textContent,
      link: window.location.hostname + initUrl
    })
  })
  return response
}