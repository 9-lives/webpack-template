// 配置文件
import { projectConf } from 'config/project.conf'

import { utils } from 'utils'

/**
 * 启动模拟 API
 */
export async function mock() {
  if (process.env.NODE_ENV === 'development' && projectConf.isMock) {
    try {
      const modules = await Promise.all([import(/* webpackChunkName: "mockjs" */ 'mockjs'), import(/* webpackChunkName: "mockData" */ './data')])
      const Mock =  modules[0].default
      const { mockData } = modules[1]

      for (let [url, params] of Object.entries(mockData)) {
        Mock.mock(url, params)
      }
    } catch (e) {
      if (e && e.message) {
        utils.log.e(e.message)
      }
    }
  }
}
