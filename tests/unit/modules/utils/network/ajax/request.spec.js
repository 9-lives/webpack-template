import {
  expect,
} from 'chai'
import {
  request,
} from 'utils/network/ajax/request'

describe('utils/network/ajax/request', () => {
  it('is a function', () => {
    expect(request).to.be.a('function')
  })
  // 失败
  it('return a rejected promise when error occured', done => {
    expect(request({
      url: '',
    }).catch(e => {
      expect(e).to.be.an('error')
      done()
    })).to.be.a('promise')
  })
  // 成功
  it('success callback function gets an object which has two properties,data and status, as its argument', done => {
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