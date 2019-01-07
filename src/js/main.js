// UI 资源
import 'ui'
// 工具方法
import {
  utils
} from 'utils'

/**
 * 全局错误监听
 */
function addGlobalErrListener() {
  window.addEventListener('error', err => {
    utils.log.e(err)
  })
}

/**
 * app 公共入口点
 */
utils.event.domContentLoaded(() => {
  addGlobalErrListener()
})
