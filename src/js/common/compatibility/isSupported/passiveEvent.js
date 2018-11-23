// 工具方法
import { utils } from 'utils'

/**
 *  passive event 兼容测试
 * @return {boolean} false 不兼容；true 兼容
 */
export function passiveEvent () {
  let isSupported = false

  try {
    let f = () => {}

    window.addEventListener('_testPassiveEvent', f, {
      get passive() {
        isSupported = true

        return true
      }
    })
    window.removeEventListener('_testPassiveEvent', f)
  } catch(e) {
    isSupported = false

    if (e && e.message) {
      utils.log.e(e.message)
    }
  }

  return isSupported
}
