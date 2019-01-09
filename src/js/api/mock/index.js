const ctx = require.context('./', true, /^\.\/(?!index)\S+.js$/)
const obj = {}

for (let i of ctx.keys()) {
  Object.assign(obj, ctx(i).default)
}

/**
 * mock 数据包
 * export default 方便跟 mock 依赖包一起动态导入。
 */
export default new Map(Object.entries(obj))