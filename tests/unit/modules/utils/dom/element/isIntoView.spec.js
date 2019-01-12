import {
  expect,
} from 'chai'
import {
  isIntoView,
} from 'utils/dom/element/isIntoView'

describe('utils/dom/element/isIntoView', () => {
  it('is a function', () => {
    expect(isIntoView).to.be.a('function')
  })
  it('return a TypeError without argument', () => {
    expect(isIntoView).to.throw(TypeError)
  })
  it('return Boolean value', () => {
    const el = document.createElement('div')

    document.body.appendChild(el)
    expect(isIntoView({
      el,
    })).to.be.true
    el.style.marginTop = `${window.innerHeight}px` // body 外边距折叠，元素在视口下边界
    expect(isIntoView({
      el,
    })).to.be.false
    expect(isIntoView({
      el,
      threshold: 1,
    })).to.be.true
    document.body.removeChild(el)
  })
})