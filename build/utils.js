/**
 * 编译配置文件工具包
 */

const htmlWpkPlugin = require('html-webpack-plugin')

const buildConf = require('./build.conf')
const pagesConf = require('./pages.conf')

// 注入页面配置
const injectPgs = {
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
    function getParams([ name, conf = {} ]) {
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
  // /**
  //  * 避免多个入口点导入的公共样式外泄，影响其他页面
  //  */
  // css() {
  //   let cssGroups = {}

  //   for (let name of Object.keys(pagesConf)) {
  //     cssGroups[`${name}Styles`] = {
  //       chunks: 'all',
  //       enforce: true,
  //       name: 'index',
  //       test: module => module.constructor.name === 'CssModule' && getIssuerName(module) === name,
  //     }
  //   }

  //   return cssGroups

  //   /**
  //    * 查询当前模块的最高级 issuer
  //    * @param {Object} module 模块
  //    * @return {Boolean || String} false 最高级 issuer 名称不存在；string issuer 名称
  //    */
  //   function getIssuerName (module) {
  //     if (module.issuer) {
  //       // 存在请求发起者，继续上溯
  //       return getIssuerName(module.issuer)
  //     } else if (module.name) {
  //       console.info(module) /* eslint-disable-line */
  //       return module.name
  //     } else {
  //       return false
  //     }
  //   }
  // }
}

/**
 * 路径分隔符统一转换到 POSIX '/'
 * @param {String} path
 */
function pathSepToPosix(path) {
  return path.replace(/\\/g, '/')
}

module.exports = {
  injectPgs,
  pathSepToPosix,
}
