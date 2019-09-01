
// import cheerio from 'cheerio'

function name () {
  return 'orpi.com'
}

function canParse (url) {
  return url.startsWith('https://www.orpi.com/recherche/')
}

/**
 * parse into json file the htlm rendered
 */
function parse (source, url) {
  return []
}

export { name, parse, canParse }
