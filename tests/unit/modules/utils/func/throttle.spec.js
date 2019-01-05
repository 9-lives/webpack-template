import { expect } from 'chai'
import { throttle } from 'utils/func/throttle'

describe('utils/func/throttle test suite', () => {
  it('expect for a function', () => {
    expect(throttle).to.be.a('function')
  })
  it('expect to return a function', () => {
    expect(throttle({ callback: () => {} })).to.be.a('function')
  })
})
