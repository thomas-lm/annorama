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
    scrollDown(30, 100, document.body.scrollHeight, function() {
      try {
        let detail = document.querySelector('[data-qa-id=adview_description_container] span[class^=TextLink]')
        if (detail) {
          detail.click()
        }
        var offerDetail = getOfferDetail()
        ipcRenderer.send('render-url', offerDetail)
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
function getOfferDetail () {
  let item = {
    images: []
  }
  
  let images = document.querySelectorAll('.c-swiper__wrapper img')
  if (images) {
    images.forEach(img => {
      let url = img.getAttribute('src')
      item.images.push(ipcRenderer.sendSync('download-required-sync', url))
    })
  }

  let title = document.querySelector('h1')
  if (title) {
    item.title = title.textContent.replace(/\s\s+/g, ' ')
  }

  let price = document.querySelector('p[class="u-text-center@md-plus u-text-center@sm u-mt-n u-mt-sm@md"] span')
  if (price) {
    item.price = price.textContent.replace(/\s\s+/g, ' ')
  }

  let description = document.querySelector('.o-container>p')
  if (description) {
    item.description = description.innerHTML.replace(/\s\s+/g, ' ')
  }
  
  let localisation = document.querySelector('h1 :nth-child(5)')
  if (localisation) {
    item.localisation = localisation.textContent.replace(/\s\s+/g, ' ')
  }

  let rooms = document.querySelector('#collapse-details-panel ul.o-grid :nth-child(5) .c-badge__text')
  if (rooms) {
    item.rooms = rooms.textContent.substring(0,rooms.textContent.indexOf(' '))
  }

  let square = document.querySelector('#collapse-details-panel ul.o-grid :nth-child(4) .c-badge__text')
  if (square) {
    item.square = square.textContent.substring(square.textContent.indexOf(' ') + 1).replace(/\s\s+/g, ' ')
  }

  let ges = document.querySelector('button[data-target=dialog-ges] .c-dpe__index')
  if (ges) {
    item.ges = ges.textContent
  }

  let energy = document.querySelector('button[data-target=dialog-dpe] .c-dpe__index')
  if (energy) {
    item.energy = energy.textContent
  }
  
  // create iframe for image


  return item
}