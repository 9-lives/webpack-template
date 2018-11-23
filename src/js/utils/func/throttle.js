/**
 * 节流
 * @param {Function} callback 回调方法
 * @return {Function} 去抖后的回调方法
 */
export function throttle ({ callback }) {
  let isRunning // 运行时标识

  return function (...args) {
    if (!isRunning) {
      window.requestAnimationFrame(timestamp => {
        callback.apply(this, args)
        isRunning = false
      })
    }

    isRunning = true
  }
}
