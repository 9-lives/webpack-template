import {
  expect
} from 'chai'
import {
  axiosInstance,
} from 'utils/network/ajax/axiosInstance'

describe('utils/network/ajax/axiosInstance test suite', () => {
  it('expect for a function', () => {
    expect(axiosInstance).to.be.a('function')
  })
  // 失败
  it('expect to return a rejected promise', done => {
    expect(axiosInstance({
      url: '',
    }).catch(e => {
      expect(e).to.be.an('error')
      done()
    })).to.be.a('promise')
  })
  // 成功
  it('expect to return a object which has data and status properties', done => {
    axiosInstance({
      url: '_success',
    }).then(d => {
      expect(d).to.be.a('object')
      expect(d).to.have.own.property('data')
      expect(d).to.have.own.property('status')
      done()
    })
  })
})