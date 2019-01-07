import {
  axiosInstance,
} from './axiosInstance'
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

  return await axiosInstance(url, {
    headers,
    method: 'get',
    params: data,
  })
}