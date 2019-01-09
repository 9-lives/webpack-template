import {
  expect
} from 'chai'
import {
  request,
} from 'utils/network/ajax/request'

describe('utils/network/ajax/request', () => {
  it('expect for a function', () => {
    expect(request).to.be.a('function')
  })
  // 失败
  it('expect to return a rejected promise', done => {
    expect(request({
      url: '',
    }).catch(e => {
      expect(e).to.be.an('error')
      done()
    })).to.be.a('promise')
  })
  // 成功
  it('expect to return a object which has data and status properties', done => {
    request({
      url: '_success',
    }).then(d => {
      expect(d).to.be.a('object')
      expect(d).to.have.own.property('data')
      expect(d).to.have.own.property('status')
      done()
    })
  })
})