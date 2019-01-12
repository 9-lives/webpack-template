import {
  expect,
} from 'chai'
import {
  remove,
} from 'utils/cookie/remove'

describe('utils/cookie/remove', () => {
  let c = 'testK=testV'

  before(() => {
    document.cookie = c
  })

  it('is a function', () => {
    expect(remove).to.be.a('function')
  })
  it('remove cookie successfully', () => {
    remove({
      k: 'testK',
    })
    expect(document.cookie.indexOf(c)).to.equal(-1)
  })
})