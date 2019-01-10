import {
  set,
} from 'utils/cookie/set'

/**
 * 生成测试 cookie
 */
export default function createCookie() {
  set({
    k: 'test',
    v: 'test value',
  })
}