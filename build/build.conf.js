const path = require('path')

/**
 * 编译参数配置
 */
module.exports = {
  assetsDir: 'assets/', // 静态资源目录
  ctx: `${path.join(__dirname, '..')}/`, // 编译配置文件上下文。使配置文件独立于工程根目录
  htmlDir: 'html/', // HTML 目录
  imgsSubDir: 'imgs/', // 静态资源目录-图片资源子目录
  maxSzToBase64: 3072, // 低于此大小的图片可能被转换为 base64 编码
  optPath: 'dist/', // 文件输出路径
  publicDir: 'public/', // 静态资源复制目录
  srcDir: 'src/', // 源码目录
  uiDir: 'ui/', // ui 文件目录
}
