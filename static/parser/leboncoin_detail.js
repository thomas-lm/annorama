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
        let detail = document.querySelector('[data-qa-id=adview_description_container] span[class^=TextLink]')
        if (detail) {
          detail.click()
        }
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

//TODO : detecter annonce supprimée h1 > "Cette annonce est désactivée"

/**
 * parse content to get all offer on this page
 */
function getOffers () {
  let item = {
    images = []
  }

  let images = document.querySelectorAll('section section img[alt^=image-galerie]')
  if (images) {
    images.forEach(img => {
      item.images.push(ipcRenderer.sendSync('download-required-sync', img.getAttribute('src')))
    })
  }

  let title = document.querySelector('[data-qa-id=adview_title] > h1')
  if (title) {
    item.title = title.textContent
  }

  let price = document.querySelector('[data-qa-id=adview_price] span')
  if (price) {
    item.price = price.textContent
  }

  let date = document.querySelector('[data-qa-id=adview_date]')
  if (date) {
    item.date = date.textContent
  }

  let description = document.querySelector('[data-qa-id=adview_description_container] span[class^=content]')
  if (description) {
    item.description = description.textContent
  }
  
  let localisation = document.querySelector('[data-qa-id=adview_location_informations] > span')
  if (localisation) {
    item.localisation = localisation
  }

  let fai_included = document.querySelector('[data-qa-id=criteria_item_fai_included] > div > div:nth-child(2)')
  if (fai_included) {
    item.fai_included = fai_included.textContent
  }

  let type = document.querySelector('[data-qa-id=criteria_item_real_estate_type] > div > div:nth-child(2)')
  if (type) {
    item.type = type.textContent
  }

  let rooms = document.querySelector('[data-qa-id=criteria_item_rooms] > div > div:nth-child(2)')
  if (rooms) {
    item.rooms = rooms.textContent
  }

  let square = document.querySelector('[data-qa-id=criteria_item_square] > div > div:nth-child(2)')
  if (square) {
    item.square = square.textContent
  }

  let gess = document.querySelectorAll('[data-qa-id=criteria_item_ges] > div > div:nth-child(2) > div div')
  if (gess) {
    gess.forEach(ges => {
      if (ges.classList.length === 3) {
        item.ges = ges.textContent
      }
    })
  }

  let energys = document.querySelectorAll('[data-qa-id=criteria_item_energy_rate] > div > div:nth-child(2) > div div')
  if (energys) {
    energys.forEach(energy => {
      if (energy.classList.length === 3) {
        item.energy = energy.textContent
      }
    })
  }
  
  return item
}