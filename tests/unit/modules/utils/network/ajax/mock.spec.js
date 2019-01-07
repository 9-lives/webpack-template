import {
  expect
} from 'chai'
import {
  mock,
} from 'utils/network/ajax/mock'

describe('utils/network/ajax/mock', () => {
  it('expect for a function', () => {
    expect(mock).to.be.a('function')
  })
  it('expect to return a promise', () => {
    expect(mock()).to.be.a('promise')
  })
})