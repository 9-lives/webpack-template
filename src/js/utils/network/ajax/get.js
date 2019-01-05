import {
  axiosInstance,
} from './axiosInstance'
import {
  mock,
} from 'api/mock'

/**
 * ajax get 方法
 */
export async function get({
  data,
  headers,
  url,
}) {
  await mock({
    axios: axiosInstance,
    url,
  })

  return await axiosInstance(url, {
    headers,
    method: 'get',
    params: data,
  })
}