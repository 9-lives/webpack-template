import {
  expect,
} from 'chai'
import {
  remove,
} from 'utils/cookie/remove'

describe('utils/cookie/remove', () => {
  before(() => {
    document.cookie = 'testK=testV;'
  })

  it('expect for a function', () => {
    expect(remove).to.be.a('function')
  })
  it('expect to remove cookie', () => {
    remove({
      k: 'testK',
    })
  })
})