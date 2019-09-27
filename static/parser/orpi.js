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
    response.push({
      uid: element.getAttribute('id'),
      title: 'todo orpi ' + element.getAttribute('id')
    })
  })
  return response
}