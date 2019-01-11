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

  it('expect for a function', () => {
    expect(get).to.be.a('function')
  })
  it(`expect to return 'undefined'`, () => {
    expect(get({
      k: '_test',
    })).to.be.a('undefined')
  })
  it(`expect to return string`, () => {
    const str = get({
      k: 'testK',
    })

    expect(str).to.be.a('string')
    expect(str.length > 0).to.equal(true)
  })
  it(`expect to return an object`, () => {
    expect(get()).to.be.a('object')
  })
})