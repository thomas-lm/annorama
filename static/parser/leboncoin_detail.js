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

//TODO : detecter annonce supprimée h1 > "Cette annonce est désactivée"

/**
 * parse content to get all offer on this page
 */
function getOfferDetail () {
  let item = {
    images: []
  }

  let controlNext = document.querySelector('[data-qa-id=slideshow_control_next]')
  if(controlNext) {
    controlNext.click();
  }
  let images = document.querySelectorAll('[data-qa-id=slideshow_container] img')
  if (images) {
    images.forEach(img => {
      let url = img.getAttribute('src')
      item.images.push(ipcRenderer.sendSync('download-required-sync', url))
    })
  }

  let title = document.querySelector('[data-qa-id=adview_title] > h1')
  if (title) {
    item.title = title.textContent.replace(/\s\s+/g, '')
  }

  let price = document.querySelector('[data-qa-id=adview_price] span')
  if (price) {
    item.price = price.textContent.replace(/\s\s+/g, '')
  }

  let date = document.querySelector('[data-qa-id=adview_date]')
  if (date) {
    item.date = date.textContent.replace(/\s\s+/g, '')
  }

  let description = document.querySelector('[data-qa-id=adview_description_container] span[class^=content]')
  if (description) {
    item.description = description.innerHTML.replace(/\s\s+/g, '')
  }
  
  let localisation = document.querySelector('[data-qa-id=adview_location_informations] > span')
  if (localisation) {
    item.localisation = localisation.textContent.replace(/\s\s+/g, '')
  }

  let fai_included = document.querySelector('[data-qa-id=criteria_item_fai_included] > div > div:nth-child(2)')
  if (fai_included) {
    item.fai_included = fai_included.textContent.replace(/\s\s+/g, '')
  }

  let type = document.querySelector('[data-qa-id=criteria_item_real_estate_type] > div > div:nth-child(2)')
  if (type) {
    item.type = type.textContent.replace(/\s\s+/g, '')
  }

  let rooms = document.querySelector('[data-qa-id=criteria_item_rooms] > div > div:nth-child(2)')
  if (rooms) {
    item.rooms = rooms.textContent.replace(/\s\s+/g, '')
  }

  let square = document.querySelector('[data-qa-id=criteria_item_square] > div > div:nth-child(2)')
  if (square) {
    item.square = square.textContent.replace(/\s\s+/g, '')
  }

  let gess = document.querySelectorAll('[data-qa-id=criteria_item_ges] > div > div:nth-child(2) > div div')
  if (gess) {
    gess.forEach(ges => {
      if (ges.classList.length === 3) {
        item.ges = ges.textContent.replace(/\s\s+/g, '')
      }
    })
  }

  if (!item.ges && item.description) {
    // no ges found, try to get from description
    if (item.description.indexOf('GES : ') > -1 ) {
      item.ges = item.description.substring(item.description.indexOf('GES : ') + 6, item.description.indexOf('GES : ') + 7)
    } else {
      if (item.description.indexOf('GSE : ') > -1 ) {
        item.ges = item.description.substring(item.description.indexOf('GSE : ') + 6, item.description.indexOf('GSE : ') + 7)
      }
    }
  }

  let energys = document.querySelectorAll('[data-qa-id=criteria_item_energy_rate] > div > div:nth-child(2) > div div')
  if (energys) {
    energys.forEach(energy => {
      if (energy.classList.length === 3) {
        item.energy = energy.textContent.replace(/\s\s+/g, '')
      }
    })
  }
  
  if (!item.energy && item.description) {
    // no ges found, try to get from description
    if (item.description.indexOf('DPE : ') > -1 ) {
      item.energy = item.description.substring(item.description.indexOf('DPE : ') + 6, item.description.indexOf('DPE : ') + 7)
    }
  }

  return item
}