const buildConf = require('./build.conf')
const merge = require('webpack-merge')
const wpk = require('webpack')

const baseConf = require('./wpk.base.conf')

/**
 * webpack 开发模式配置
 */
module.exports = merge(baseConf, {
  devServer: {
    contentBase: `${buildConf.ctx}${buildConf.publicDir}`,
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new wpk.HotModuleReplacementPlugin(),
  ],
})