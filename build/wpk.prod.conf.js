const cleanWpkPlugin = require('clean-webpack-plugin')
const copyWpkPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const miniCssExtPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWpkPlugin = require('optimize-css-assets-webpack-plugin')
const terserWpkPlugin = require('terser-webpack-plugin')

const buildConf = require('./build.conf')
const baseConf = require('./wpk.base.conf')

// const utils = require('./utils')

/**
 * webpack 生产模式配置
 */
module.exports = merge(baseConf, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new optimizeCssAssetsWpkPlugin(),
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
        // ...utils.injectPgs.css(),
        common: {
          chunks: 'initial',
          minChunks: 3,
          name: 'common',
          priority: -15,
        },
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    }
  },
  plugins: [
    new cleanWpkPlugin([buildConf.optPath], {
      root: buildConf.ctx,
    }),
    new copyWpkPlugin([
      {
        from: buildConf.publicDir,
      }
    ]),
    new miniCssExtPlugin({
      filename: `css/[name].[contenthash].css`,
      chunkFilename: `css/[name].[contenthash].chunk.css`
    }),
  ],
})
