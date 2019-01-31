import {
  expect,
} from 'chai'
import {
  mock,
} from 'utils/network/ajax/mock'

describe('utils/network/ajax/mock', () => {
  it('is a function', () => {
    expect(mock).to.be.a('function')
  })
  // mock is a asynchronous function because it will import dependencies and mock data dynamically
  it('return a promise', () => {
    expect(mock()).to.be.a('promise')
  })
})