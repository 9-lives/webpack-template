const wpk = require('webpack')

const buildConf = require('./build.conf')

/**
 * webpack 开发模式配置
 */
module.exports = {
  devServer: {
    contentBase: buildConf.optPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 9000,
    // publicPath: '../'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: []
  },
  plugins: [
    new wpk.HotModuleReplacementPlugin(),
  ],
}
