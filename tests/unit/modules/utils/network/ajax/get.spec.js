import {
  expect,
} from 'chai'
import {
  get,
} from 'utils/network/ajax/get'

describe('utils/network/ajax/get', () => {
  it('is a function', () => {
    expect(get).to.be.a('function')
  })
  // 失败
  it('return a rejected promise when error occured', done => {
    expect(get({
      url: '',
    }).catch(e => {
      expect(e).to.be.an('error')
      done()
    })).to.be.a('promise')
  })
  // 成功
  it('success callback function gets an object which has two properties,data and status, as its argument', done => {
    get({
      url: '_success',
    }).then(d => {
      expect(d).to.be.a('object')
      expect(d).to.have.own.property('data')
      expect(d).to.have.own.property('status')
      done()
    })
  })
})