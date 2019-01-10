// 库
import Cookie from 'js-cookie'

/**
 * 设置 cookie
 * @param {String} k 键
 * @param {String} v 值
 * @param {Object} options 选项
 */
export function set({
  k,
  v,
  options = {},
}) {
  Cookie.set(k, v, options)
}