const ctx = require.context('./', true, /^\.\/(?!index)\S+.js$/)
const obj = {}

for (let i of ctx.keys()) {
  Object.assign(obj, ctx(i).default)
}

export default new Map(Object.entries(obj))