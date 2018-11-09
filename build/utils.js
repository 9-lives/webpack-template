const htmlWpkPlugin = require('html-webpack-plugin')

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

  if (!(conf.plugins instanceof Array)) {
    throw new Error(`failed to add multiple pages`)
  }

  for (let name of pagesConf.keys()) {
    initParams(name)
    setEntry({
      conf,
      name,
    })
    conf.plugins.push(new htmlWpkPlugin(pagesConf.get(name)))
  }

  return conf

  /**
   * 初始化 html-webpack-plugin 参数
   * @param {Object} name 入口文件名
   * @return {Object} html-webpack-plugin 参数
   */
  function initParams(name) {
    let params = pagesConf.get(name)

    if (!params) {
      params = {}
    }

    if (!params.favicon) {
      // bug: favicon.ico 位置输出错误，可以使用 faviconsWebpackPlugin 解决，但是目前不支持 html-webpack-plugin 4.0.0 beta
      params.favicon = 'favicon.ico'
    }

    if (!params.excludeChunks) {
      // 未手动指定排除代码块
      params.excludeChunks = Array.from(pagesConf.keys()).filter(c => {
        return c !== name
      }) // 
    }

    if (!(params.filename && params.template)) {
      // 未手动指定 html 文件路径
      params.filename = `${buildConf.htmlDir}${name}.html`
      params.template = `${buildConf.srcDir}${buildConf.htmlDir}${name}.html`
    }

    pagesConf.set(name, params)
  }

  /**
   * 设置入口点
   * @param {Object} conf webpack 配置文件拷贝
   * @param {String} name 入口文件名
   */
  function setEntry({
    conf,
    name
  }) {
    if (typeof conf.entry === 'object' || typeof conf.entry === 'undefined') {
      // 设置入口
      conf.entry = {
        ...conf.entry,
        [name]: `./${buildConf.srcDir}js/pages/${name}.js`,
      }
    }
  }
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