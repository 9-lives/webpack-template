/**
 * app 公共入口点
 */
// UI 资源
export * from 'styles'
// 配置文件
import {
  projectConf
} from 'config/project.conf'
// 工具方法
import { utils } from 'utils'

/**
 * 全局错误监听
 */
function addGlobalErrListener () {
  window.addEventListener('error', err => {
    console.error(err)
  })
}

utils.event.domContentLoaded(() => {
  if (process.env.NODE_ENV === 'development' && projectConf.isMock) {
    import('api/mock')
      .then(({ mock }) => {
        mock()
      })
      .catch(e => {
        if (e && e.message) {
          utils.log.e(e.message)
        }
      })
  }

  addGlobalErrListener()
})
