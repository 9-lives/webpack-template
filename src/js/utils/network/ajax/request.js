import axios from 'axios'

// 配置文件
import {
  projectConf,
} from 'config/project.conf'

const request = axios.create({
  timeout: projectConf.ajaxTimeout,
})

request.interceptors.response.use(rs => {
  // 正常响应拦截器
  return rs
}, err => {
  return Promise.reject(err)
})

/**
 * 全局 axios 实例
 */
export {
  request
}