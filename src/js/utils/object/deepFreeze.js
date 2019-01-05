/**
 * 深冻结
 * 不涉及继承属性；可能冻结到不该被冻结的对象，如 window；
 * @param {Object} o 目标对象
 * @return {Object} 源对象
 */
export function deepFreeze(o) {
  if (typeof o === 'object' && o !== null) {
    Object.freeze(o)

    for (let p of Object.values(o)) {
      deepFreeze(p)
    }
  }

  return o
}
