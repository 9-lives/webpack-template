import {
  expect
} from 'chai'
import {
  post,
} from 'utils/network/ajax/post'

describe('utils/network/ajax/post', () => {
  it('expect for a function', () => {
    expect(post).to.be.a('function')
  })
  // 失败
  it('expect to return a rejected promise', done => {
    expect(post({
      url: '',
    }).catch(e => {
      expect(e).to.be.an('error')
      done()
    })).to.be.a('promise')
  })
  // 成功
  it('expect to return a object which has data and status properties', done => {
    post({
      url: '_success',
    }).then(d => {
      expect(d).to.be.a('object')
      expect(d).to.have.own.property('data')
      expect(d).to.have.own.property('status')
      done()
    })
  })
})