import axios from 'axios'
import qs from 'qs'

// 配置文件
import { projectConf } from 'config/project.conf'

import { mock } from 'api/mock'

const service = axios.create({
  timeout: projectConf.ajaxTimeout,
})

service.interceptors.response.use(rs => {
  // 正常响应拦截器
  return rs
}, err => {
  return Promise.reject(err)
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
