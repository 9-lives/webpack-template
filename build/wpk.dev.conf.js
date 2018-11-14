const wpk = require('webpack')

/**
 * webpack 开发模式配置
 */
module.exports = {
  devServer: {
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
}
