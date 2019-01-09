import qs from 'qs'

import {
  request,
} from './request'
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

  return await request({
    auth,
    data: qs.stringify(data),
    headers,
    method: 'post',
    url,
    withCredentials,
  })
}