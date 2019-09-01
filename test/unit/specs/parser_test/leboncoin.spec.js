import { canParse, parse } from '@/parser/impl/leboncoin.js'
import fs from 'fs'

describe('Leboncoin', () => {
  it('should not parse url ', () => {
    const result = canParse('http://www.lebicoin.fr')
    expect(result).to.equal(false)
  })
})

describe('Leboncoin', () => {
  it('should parse url ', () => {
    const result = canParse('https://www.leboncoin.fr/recherche/dslkd')
    expect(result).to.equal(true)
  })
})

describe('Leboncoin', () => {
  it('should parse html and generate js object', () => {
    const html = fs.readFileSync('./test/unit/specs/parser_test/leboncoin_data.html')
    const url = 'URLBASE'
    const result = parse(html, url)
    const expected = [
      { id: '1', title: 'ReMarkable & Marker & Folio "Charcoal grey"', price: '150€', link: url + '/link/1.htm/' },
      { id: '2', title: 'titre2', price: '2€', link: url + '/link/2.htm/' }
    ]
    // console.log(result)
    // console.log(expected)
    expect(result).to.eql(expected)
  })
})
