import {
  expect,
} from 'chai'
import {
  set,
} from 'utils/cookie/set'

describe('utils/cookie/set', () => {
  after(() => {
    document.cookie = `testK=testV;expires=${new Date(0)};`
  })

  it('is a function', () => {
    expect(set).to.be.a('function')
  })
  it(`set cookie`, () => {
    set({
      k: 'testK',
      v: 'testV',
    })

    expect(document.cookie.split(';').includes('testK=testV')).to.equal(true)
  })
})