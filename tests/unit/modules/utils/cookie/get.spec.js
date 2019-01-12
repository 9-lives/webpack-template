import {
  expect,
} from 'chai'
import {
  get,
} from 'utils/cookie/get'

describe('utils/cookie/get', () => {
  let c = 'testK=testV;'

  before(() => {
    document.cookie = c
  })
  after(() => {
    document.cookie = `${c}expires=${new Date(0)};`
  })

  it('is a function', () => {
    expect(get).to.be.a('function')
  })
  it(`return undefined without cookie`, () => {
    expect(get({
      k: '_test',
    })).to.be.a('undefined')
  })
  it(`return string when pass a key of cookie as parameter`, () => {
    const str = get({
      k: 'testK',
    })

    expect(str).to.be.a('string')
    expect(str.length > 0).to.equal(true)
  })
  it(`return an object because of no parameter passed`, () => {
    expect(get()).to.be.a('object')
  })
})