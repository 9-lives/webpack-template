import {
  expect
} from 'chai'
import {
  debounce
} from 'utils/func/debounce'

describe('utils/func/debounce', () => {
  it('is a function', () => {
    expect(debounce).to.be.a('function')
  })
  it('return a function can be executed', () => {
    expect(debounce({
      callback: () => {},
    })).to.be.a('function')
  })
  it('execute callback function', done => {
    debounce({
      callback: done,
      threshold: 0,
    })()
  })
})