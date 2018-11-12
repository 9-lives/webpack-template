// 库
import Mock from 'mockjs'
// 配置文件
import {
  projectConf
} from 'config/project.conf'

import {
  mockData
} from './data'

if (process.env.NODE_ENV === 'development' && projectConf.isMock) {
  // 必须在开发环境(否则多入口点，可能出现 Mock 未加载完毕，发 ajax 请求的情况)，且打开 Mock 开关
  Promise.all([import('mockjs')])
    .then(ret => {
      let mock = ret[0].default

      for (let [url, params] of Object.entries(mockData)) {
        mock.mock(url, params)
      }
    })
}