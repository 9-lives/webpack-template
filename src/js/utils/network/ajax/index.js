import axios from 'axios'
import qs from 'qs'

// 配置文件
import { projectConf } from 'config/project.conf'

import { log } from 'utils/log'

const service = axios.create({
  timeout: projectConf.ajaxTimeout,
})

service.interceptors.response.use(rs => {
  // 正常响应拦截器
  return rs
})

async function get({
  data,
  headers,
  url,
}) {
  await mock()

  return await service(url, {
    headers,
    method: 'get',
    params: data,
  })
}

let mockModule
/**
 * 启用模拟数据
 */
async function mock () {
  if (process.env.NODE_ENV === 'development' && projectConf.isMock && !mockModule) {
    try {
      mockModule = await import('api/mock')
      mockModule.mock()
    } catch (e) {
      if (e && e.message) {
        log.e(e.message)
      }
    }
  }
}

async function post({
  auth,
  data,
  headers,
  url,
  withCredentials,
}) {
  await mock()

  return await service({
    auth,
    data: qs.stringify(data),
    headers,
    method: 'post',
    url,
    withCredentials,
  })
}

/**
 * ajax 方法
 */
export const ajax = {
  get,
  post,
}