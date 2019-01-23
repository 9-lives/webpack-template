import {
  expect,
} from 'chai'
import {
  throttle,
} from 'utils/func/throttle'

describe('utils/func/throttle', () => {
  it('is a function', () => {
    expect(throttle).to.be.a('function')
  })
  it('return a function', () => {
    expect(throttle({
      callback() {}
    })).to.be.a('function')
  })
  it('execute callback function', (done) => {
    throttle({
      callback: done,
    })()
  })
})