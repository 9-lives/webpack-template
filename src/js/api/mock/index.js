// 配置文件
import {
  projectConf
} from 'config/project.conf'

import {
  utils
} from 'utils'

/**
 * 启动 API mock
 * @param {String} url 请求 URL
 */
export async function mock({
  url,
}) {
  if (process.env.NODE_ENV === 'development' && projectConf.isMock) {
    try {
      const modules = await Promise.all([import( /* webpackChunkName: "axiosMockAdapter" */ 'axios-mock-adapter'), import( /* webpackChunkName: "mockData" */ './data')])
      const mockAdapter = new (modules[0].default)(utils.network.ajax.axiosInstance)
      const mockConf = modules[1].default.get(url)
      const {
        data = {},
        method = 'post',
        status = '200'
      } = mockConf ? mockConf : {}

      if (method === 'get') {
        mockAdapter.onGet(url).reply(status, data)
      } else {
        mockAdapter.onPost(url).reply(status, data)
      }
    } catch (e) {
      if (e && e.message) {
        utils.log.e(e.message)
      }
    }
  }
}
