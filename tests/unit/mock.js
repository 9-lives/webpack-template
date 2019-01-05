import mockConf from 'api/mock/data'
import {
  axiosInstance,
} from 'utils/network/ajax/axiosInstance'
import AxiosMockAdapter from 'axios-mock-adapter'

/**
 * 启动 API mock
 */
export default function mock() {
  const mockAdapter = new AxiosMockAdapter(axiosInstance)

  for (let [k, v] of mockConf) {
    const {
      data = {},
        method = 'post',
        status = '200'
    } = v

    if (method === 'get') {
      mockAdapter.onGet(k).reply(status, data)
    } else {
      mockAdapter.onPost(k).reply(status, data)
    }
  }

  // 测试正常情况
  mockAdapter.onAny('_success').reply(200, {
    msg: 'succeed'
  })
}