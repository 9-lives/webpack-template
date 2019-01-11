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

  it('expect for a function', () => {
    expect(set).to.be.a('function')
  })
  it(`expect to set cookie`, () => {
    set({
      k: 'testK',
      v: 'testV',
    })

    expect(document.cookie.split(';').includes('testK=testV')).to.equal(true)
  })
})