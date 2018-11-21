// 工具方法
import { utils } from 'utils'

import { Result } from 'api/result'

/**
 * API 案例
 */
export async function example0Api (options = {}) {
  let {
    data0,
    data1,
  } = options

  let ret = await utils.network.ajax.post({
    url: 'example/0',
    data: {
      data0,
      data1,
    }
  })

  return new Result(ret)
}
