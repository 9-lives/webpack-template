// 库
import Mock from 'mockjs'

import {
  mockData
} from './data'

/**
 * 启动模拟 API
 */
export function mock() {
  for (let [url, params] of Object.entries(mockData)) {
    Mock.mock(url, params)
  }
}
