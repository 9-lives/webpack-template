// 配置文件
import {
  projectConf
} from 'config/project.conf'

import {
  log,
} from 'utils/log'
import {
  request,
} from './request'

let mockAdapter

/**
 * 启动 API mock
 * 并发非阻塞请求，mock 方法可能重复执行，未见负面影响
 * @param {String} url 请求 URL
 */
export async function mock() {
  if (!mockAdapter && process.env.NODE_ENV === 'development' && projectConf.isMock) {
    try {
      const modules = await Promise.all([import( /* webpackChunkName: "AxiosMockAdapter" */ 'axios-mock-adapter'), import( /* webpackChunkName: "mockData" */ 'api/mock')])

      mockAdapter = new(modules[0].default)(request)

      for (let [url, {
          data = {},
          method = 'post',
          status = 200
        } = {}] of modules[1].default.entries()) {
        mockAdapter[`on${method === 'get' ? 'Get' : 'Post'}`](url).reply(status, data)
      }
    } catch (e) {
      if (e && e.message) {
        log.e(e.message)
      }
    }
  }
}