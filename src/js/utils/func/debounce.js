/**
 * 防抖
 * @param {Function} callback 回调方法
 * @param {Number} [threshold] 时间片。单位 ms
 * @return {Function} 去抖后的回调方法
 */
export function debounce ({ callback = () => {}, threshold = 500 } = {}) {
  let timer

  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      Reflect.apply(callback, this, args)
    }, threshold)
  }
}
