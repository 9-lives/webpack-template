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
    excludeChunks({
      conf,
      name,
    })
    pagesConf.set(name, {
      ...pagesConf.get(name),
      filename: `${buildConf.htmlDir}${name}.html`,
      template: `${buildConf.srcDir}${buildConf.htmlDir}${name}.html`,
    })

    conf.plugins.push(new htmlWpkPlugin(params))
  }

  // for (let name of pagesConf.keys()) {
  //   let params = pagesConf.get(name)

  //   if (!params.excludeChunks) {
  //     // 未手动指定排除代码块
  //     params.excludeChunks = Array.from(pagesConf.keys()).filter(c => {
  //       return c !== name
  //     }) // 
  //   }

  //   conf.plugins.push(new htmlWpkPlugin(params))
  // }
  return conf

  /**
   * 排除其他页面各自的 chunk
   * @param {Object} conf webpack 配置文件拷贝
   * @param {Object} name 入口文件名
   */
  function excludeChunks ({ conf, name }) {
    for (let name of pagesConf.keys()) {
      let params = pagesConf.get(name)

      if (!params.excludeChunks) {
        // 未手动指定排除代码块
        params.excludeChunks = Array.from(pagesConf.keys()).filter(c => {
          return c !== name
        }) // 
      }

      conf.plugins.push(new htmlWpkPlugin(params))
    }
  }

  /**
   * 初始化参数
   * @param {Object} name 入口文件名
   * @return {Object} html-webpack-plugin 参数
   */
  function initParams (name) {
    let params = pagesConf.get(name)

    if (typeof params === 'undefined') {
      params = {}
    }

    if (typeof params.favicon === 'undefined') {
      params.favicon = 'favicon.ico'
    }

    pagesConf.set(name, params)
  }

  /**
   * 设置入口点
   * @param {Object} conf webpack 配置文件拷贝
   * @param {String} name 入口文件名
   */
  function setEntry ({ conf, name }) {
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