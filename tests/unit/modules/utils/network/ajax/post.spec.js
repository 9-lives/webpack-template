import {
  expect,
} from 'chai'
import {
  post,
} from 'utils/network/ajax/post'

describe('utils/network/ajax/post', () => {
  it('is a function', () => {
    expect(post).to.be.a('function')
  })
  // 失败
  it('return a rejected promise when error occured', done => {
    expect(post({
      url: '',
    }).catch(e => {
      expect(e).to.be.an('error')
      done()
    })).to.be.a('promise')
  })
  // 成功
  it('success callback function gets an object which has two properties,data and status, as its argument', done => {
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