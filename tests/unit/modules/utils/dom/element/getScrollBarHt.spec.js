import {
  expect,
} from 'chai'
import {
  getScrollBarHt,
} from 'utils/dom/element/getScrollBarHt'

describe('utils/dom/element/getScrollBarHt', () => {
  const scroll = 600 // 滚动距离

  it('is a function', () => {
    expect(getScrollBarHt).to.be.a('function')
  })
  it('return a TypeError', () => {
    expect(getScrollBarHt).to.throw(TypeError)
  })
  it(`return scroll bar's height of root element`, () => {
    const div = document.createElement('div')

    div.style.height = '4000px'
    document.body.appendChild(div)
    document.body.maxHeight = document.documentElement.style.maxHeight = '1920px'
    document.body.style.overflow = document.documentElement.style.overflow = 'auto'
    document.body.scrollTop = document.documentElement.scrollTop = scroll
    expect(getScrollBarHt(document.body)).to.equal(scroll)
    expect(getScrollBarHt(document.documentElement)).to.equal(scroll)
    document.body.maxHeight = document.documentElement.style.maxHeight = 'none'
    document.body.style.overflow = document.documentElement.style.overflow = 'visible'
    document.body.removeChild(div)
    document.body.scrollTop = document.documentElement.scrollTop = 0
  })
  it(`return scroll bar's height of element`, () => {
    const div = document.createElement('div')
    const wrapper = document.createElement('div')

    div.style.height = '4000px'
    wrapper.style.maxHeight = '1920px'
    wrapper.style.overflow = 'auto'
    wrapper.appendChild(div)
    document.body.appendChild(wrapper)
    wrapper.scrollTop = scroll
    expect(getScrollBarHt(wrapper)).to.equal(scroll)
    document.body.removeChild(wrapper)
  })
})