// 配置文件
import {
  projectConf
} from 'config/project.conf'
// 工具方法
import { utils } from 'utils'

/**
 * 启动模拟 API
 */
export async function mock() {
  if (process.env.NODE_ENV === 'development' && projectConf.isMock) {
    try {
      let ret = await Promise.all([import('mockjs'), import('./data')])
      let Mock = ret[0]
      let mockData = ret[1].mockData

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