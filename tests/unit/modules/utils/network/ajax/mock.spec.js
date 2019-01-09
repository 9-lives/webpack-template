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
  // mock is a asynchronous function because it will import dependencies and data dynamically
  it('expect to return a promise', () => {
    expect(mock()).to.be.a('promise')
  })
})