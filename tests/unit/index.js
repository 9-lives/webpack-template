import mockData from 'api/mock'
import AxiosMockAdapter from 'axios-mock-adapter'
import {
  request,
} from 'utils/network/ajax/request'

/**
 * 开始测试
 */
function testStart() {
  const testsContext = require.context('./', true, /\.spec.js$/)
  testsContext.keys().forEach(testsContext)
}

/**
 * 启动 API mock
 */
function mock() {
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

/**
 * 单元测试入口
 */
(() => {
  mock()
  testStart()
})()