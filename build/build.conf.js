const path = require('path')

/**
 * 编译参数配置
 */
module.exports = {
  assetsDir: 'assets/', // 静态资源目录
  context: `${path.join(__dirname, '..')}/`, // 编译配置文件上下文。使配置文件独立于工程根目录
  cssDir: 'css/', // css 目录
  htmlDir: 'html/', // HTML 目录
  imgsSubDir: 'imgs/', // 静态资源目录-图片资源子目录
  optPath: 'dist/', // 文件输出路径
  srcDir: 'src/', // 源码目录
}
