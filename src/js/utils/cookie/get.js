// 库
import Cookie from 'js-cookie'

/**
 * 取 cookie
 * @param {String} k 键。不传将返回所有键值对组成的对象
 * @return {String} 值
 */
export function get({
  k,
} = {}) {
  return Cookie.get(k)
}