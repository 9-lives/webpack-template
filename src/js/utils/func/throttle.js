/**
 * 节流。兼容到 IE 10
 * @param {Function} callback 回调方法
 * @return {Function} 去抖后的回调方法
 */
export function throttle ({ callback }) {
  let isRunning // 运行时标识
  let rqFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame

  return rqFrame ? function (...args) {
    if (!isRunning) {
      rqFrame(timestamp => {
        Reflect.apply(callback, this, args)
        isRunning = false
      })
    }

    isRunning = true
  } : callback
}
