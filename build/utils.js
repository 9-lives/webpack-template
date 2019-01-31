/**
 * 编译配置文件工具包
 */

const htmlWpkPlugin = require('html-webpack-plugin')
const buildConf = require('./build.conf')
const pagesConf = require('./pages.conf')

/**
 * 设置路径别名
 */
exports.getAlias = function () {
  return {
    api: `${buildConf.ctx}${buildConf.srcDir}js/api/`,
    assets: `${buildConf.ctx}${buildConf.srcDir}${buildConf.assetsDir}`,
    config: `${buildConf.ctx}config/`,
    constants: `${buildConf.ctx}${buildConf.srcDir}js/constants/`,
    html: `${buildConf.ctx}${buildConf.srcDir}${buildConf.htmlDir}`,
    js: `${buildConf.ctx}${buildConf.srcDir}js/`,
    ui: `${buildConf.ctx}${buildConf.srcDir}${buildConf.uiDir}`,
    utils: `${buildConf.ctx}${buildConf.srcDir}js/utils/`,
  }
}

// 注入页面配置
exports.injectPgs = {
  /**
   * 入口点
   */
  entries() {
    let entries = {}

    for (let name of Object.keys(pagesConf)) {
      entries[name] = `./${buildConf.srcDir}js/pages/${name}.js`
    }

    return entries
  },
  /**
   * html-webpack-plugin
   */
  htmlWpkPlugin() {
    let plugins = []

    for (let i of Object.entries(pagesConf)) {
      plugins.push(new htmlWpkPlugin(getParams(i)))
    }

    return plugins

    /**
     * 取 html-webpack-plugin 参数
     * @param {Object} conf 配置
     * @param {String} name 入口文件名
     * @return {Object} html-webpack-plugin 参数
     */
    function getParams([name, conf = {}]) {
      let {
        chunks,
        compress = true,
        excludeChunks,
        favicon = 'public/favicon.ico',
        filename = `html/${name}.html`,
        template = `${buildConf.srcDir}${buildConf.htmlDir}${name}.html`,
      } = conf

      if (!(excludeChunks || chunks instanceof Array)) {
        // 未手动指定(排除/包含)代码块
        excludeChunks = Array.from(Object.keys(pagesConf)).filter(c => c !== name)
      }

      return {
        chunks,
        compress,
        excludeChunks,
        favicon,
        filename,
        template,
      }
    }
  },
}

/**
 * 路径分隔符统一转换到 POSIX '/'
 * @param {String} path
 */
exports.pathSepToPosix = function (path) {
  return path.replace(/\\/g, '/')
}