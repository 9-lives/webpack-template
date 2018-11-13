/**
 * app 公共入口点
 */
// UI 资源
export * from 'css'
// 工具方法
import { utils } from 'utils'

import { mock } from 'api/mock'

/**
 * 全局错误监听
 */
function addGlobalErrListener () {
  window.addEventListener('error', err => {
    console.error(err)
  })
}

utils.event.domContentLoaded(() => {
  mock()
  addGlobalErrListener()
})
