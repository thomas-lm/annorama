const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function() {
    let iframeRecapcha = document.querySelector('iframe[src*="captcha"]')

    if (iframeRecapcha) {
      console.log('asking for captcha')
      ipcRenderer.send('user-interact-required')
    } else {
      ipcRenderer.once('render-url-reply', () => {
        console.log('reply to renderer')
      })
      console.log(getOffers())
      // ipcRenderer.send('render-url', getOffers())
    }
  }, 5000)
})

/**
 * parse content to get all offer on this page
 */
function getOffers () {
  let items = document.querySelectorAll('div[data-component="estate-result"]>div ul:first-child article')
  let response = []
  items.forEach(element => {
    response.push({
      uid: element.getAttribute('id'),
      title: 'todo orpi ' + element.getAttribute('id')
    })
  })
  return response
}