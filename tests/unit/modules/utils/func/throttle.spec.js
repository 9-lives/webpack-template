import { expect } from 'chai'
import { throttle } from 'utils/func/throttle'
/* eslint-disable */
describe('utils/func/throttle', () => {
  it('expect for a function', () => {
    expect(throttle).to.be.a('function')
  })
  it('expect to return a function', () => {
    expect(throttle({ callback () {} })).to.be.a('function')
  })
  it('expect to execute callback function', (done) => {
    throttle({
      callback: done,
    })()
  })
})
