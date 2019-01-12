/**
 * 是否在视口中出现
 * @param {Object} el DOM 元素
 * @param {Number} threshold 判定间距。不能小于 0，不管元素在视口哪一侧，计算时都加入提前量。
 * @return {Boolean} false 不在；true 在
 */
export function isIntoView({
  el,
  threshold,
} = {}) {
  if (isNaN(threshold = Number.parseInt(threshold)) || threshold < 0) {
    // 非数字、负数默认 0
    threshold = 0
  }

  const rect = el.getBoundingClientRect()
  let h = typeof rect.height !== 'undefined' ? rect.height : (el.offsetHeight ? el.offsetHeight : 0)

  return (rect.top + h + threshold) >= 0 &&
  rect.top < window.innerHeight + threshold
}