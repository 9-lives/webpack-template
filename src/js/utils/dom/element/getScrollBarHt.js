/**
 * 获取滚动条高度
 * @param {Object} el DOM 元素
 * @return {Number} 元素的滚动条高度
 */
export function getScrollBarHt(el) {
  return ['body', 'html'].includes(el.nodeName.toLowerCase()) ?
    (window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0) :
    (el.scrollTop || 0)
}