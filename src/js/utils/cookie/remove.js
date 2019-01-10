// 库
import Cookie from 'js-cookie'

/**
 * 删除 cookie
 * @param {String} k 键
 * @param {Object} options 选项
 */
export function remove({
  k,
  options = {},
}) {
  Cookie.remove(k, options)
}