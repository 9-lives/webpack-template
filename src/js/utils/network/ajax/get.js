import {
  request,
} from './request'
import {
  mock,
} from './/mock'

/**
 * ajax get 方法
 */
export async function get({
  data,
  headers,
  url,
}) {
  await mock()

  return await request(url, {
    headers,
    method: 'get',
    params: data,
  })
}