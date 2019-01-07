import qs from 'qs'

import {
  axiosInstance,
} from './axiosInstance'
import {
  mock
} from './mock'

/**
 * ajax post 方法
 */
export async function post({
  auth,
  data,
  headers,
  url,
  withCredentials,
}) {
  await mock()

  return await axiosInstance({
    auth,
    data: qs.stringify(data),
    headers,
    method: 'post',
    url,
    withCredentials,
  })
}