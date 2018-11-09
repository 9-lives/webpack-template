const cleanWpkPlugin = require('clean-webpack-plugin')
const miniCssExtPlugin = require('mini-css-extract-plugin')

const buildConf = require('./build.conf')

/**
 * webpack 生产模式配置
 */
module.exports = {
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: []
  },
  plugins: [
    new cleanWpkPlugin([buildConf.optPath], {
      root: buildConf.context
    }),
    new miniCssExtPlugin({
      filename: `${buildConf.cssDir}[name].[hash].css`,
      chunkFilename: `${buildConf.cssDir}[name].[chunkhash].chunk.css`
    }),
  ],
}
