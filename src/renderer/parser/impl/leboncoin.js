
import cheerio from 'cheerio'

function name () {
  return 'leboncoin.fr'
}

function canParse (url) {
  return url.startsWith('https://www.leboncoin.fr/')
}

/**
 * parse into json file the htlm rendered
 */
function parse (source, url) {
  const $ = cheerio.load(source)
  let items = $('li[itemtype="http://schema.org/Offer"]').toArray()
  let response = []
  items.forEach(element => {
    let $e = cheerio.load($(element).html())

    // Get url from source
    let initUrl = $e('a').attr('href')
    let itemUrl = initUrl

    // Remove last / if exist
    if (itemUrl.lastIndexOf('/') === itemUrl.length - 1) {
      itemUrl = itemUrl.substring(0, itemUrl.lastIndexOf('/'))
    }

    // get ID from url
    let itemId = itemUrl.substring(itemUrl.lastIndexOf('/') + 1, itemUrl.lastIndexOf('.'))
    let item = {
      uid: itemId,
      title: $e('span[itemprop="name"]').text().replace(/\s+/g, ' '),
      price: $e('span[itemprop="priceCurrency"]').text().replace(/\s+/g, ''),
      link: url + '/' + initUrl
    }
    response.push(item)
  })
  return response
}

export { name, parse, canParse }
