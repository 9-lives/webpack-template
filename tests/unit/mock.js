import mockData from 'api/mock'
import {
  request,
} from 'utils/network/ajax/request'
import AxiosMockAdapter from 'axios-mock-adapter'

/**
 * 启动 API mock
 */
export default function mock() {
  let mockAdapter = new AxiosMockAdapter(request)

  for (let [url, {
      data = {},
      method = 'post',
      status = 200
    } = {}] of mockData.entries()) {
    mockAdapter[`on${method === 'get' ? 'Get' : 'Post'}`](url).reply(status, data)
  }

  // 测试正常情况
  mockAdapter.onAny('_success').reply(200, {
    msg: 'succeed'
  })
}