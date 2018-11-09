const htmlWebpackPlugin = require('html-webpack-plugin')

const buildConf = require('./build.conf')
const pagesConf = require('./pages.conf')

/**
 * HTML 多页面注入
 * @param {Object} wpkConf webpack 配置对象
 */
function addMulPg({
  wpkConf
}) {
  let conf = { ...wpkConf }

  if (!(pagesConf instanceof Array || conf.plugins instanceof Array)) {
    throw new Error(`failed to add multiple pages`)
  }

  let pgsChunks = [] // 所有页面各自的入口 chunk
  let htmlWpkPlgParams = new Map() // 所有页面各自的 html-webpack-plugin 插件配置

  for (let o of pagesConf) {
    let {
      favicon = 'favicon.ico',
        name,
    } = o

    if (typeof conf.entry === 'object' || !conf.entry) {
      // 设置入口
      conf.entry = {
        ...conf.entry,
        [name]: `./${buildConf.srcDir}js/pages/${name}.js`,
      }
    }

    pgsChunks.push(name)
    htmlWpkPlgParams.set(name, {
      favicon,
      excludeChunks: [name],
      filename: `${buildConf.htmlDir}${name}.html`,
      template: `${buildConf.srcDir}${buildConf.htmlDir}${name}.html`,
    })
  }

  for (let [name, o] of htmlWpkPlgParams.entries()) {
    o.excludeChunks = pgsChunks.filter(c => {
      return c !== name
    }) // 排除其他页面各自的 chunk
    conf.plugins.push(new htmlWebpackPlugin(o))
  }

  return conf
}

/**
 * 路径分隔符统一转换到 POSIX '/'
 * @param {String} path
 */
function pathSepToPosix(path) {
  return path.replace(/\\/g, '/')
}

module.exports = {
  addMulPg,
  pathSepToPosix,
}