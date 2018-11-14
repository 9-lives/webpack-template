const cleanWpkPlugin = require('clean-webpack-plugin')
const miniCssExtPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWpkPlugin = require('optimize-css-assets-webpack-plugin')
const terserWpkPlugin = require('terser-webpack-plugin')

const buildConf = require('./build.conf')

/**
 * webpack 生产模式配置
 */
module.exports = {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    // webpackv4，重载生产模式默认设置 minimize: true
    minimizer: [
      new optimizeCssAssetsWpkPlugin(),
      // webpackv5 可能默认使用 terser
      new terserWpkPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {},
          mangle: true,
        },
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendors',
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        }
      },
    }
  },
  plugins: [
    new cleanWpkPlugin([buildConf.optPath], {
      root: buildConf.ctx
    }),
    new miniCssExtPlugin({
      filename: `${buildConf.cssDir}[name].[hash].css`,
      chunkFilename: `${buildConf.cssDir}[name].[chunkhash].chunk.css`
    }),
  ],
}
