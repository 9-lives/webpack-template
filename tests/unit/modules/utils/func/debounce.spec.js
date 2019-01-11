import {
  expect
} from 'chai'
import {
  debounce
} from 'utils/func/debounce'

describe('utils/func/debounce', () => {
  it('expect for a function', () => {
    expect(debounce).to.be.a('function')
  })
  it('expect to return a function', () => {
    expect(debounce({
      callback: () => {},
    })).to.be.a('function')
  })
  it('expect to execute callback function', done => {
    debounce({
      callback: done,
      threshold: 0,
    })()
  })
})