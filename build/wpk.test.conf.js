const buildConf = require('./build.conf')

/**
 * webpack 单元测试配置
 */
module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [{
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.js$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            configFile: 'build/.eslintrc.js'
          }
        }]
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            configFile: './build/babel.conf.js'
          }
        }, ]
      }
    ]
  },
  optimization: {
    nodeEnv: 'test',
  },
  resolve: {
    alias: {
      api: `${buildConf.ctx}${buildConf.srcDir}js/api/`,
      config: `${buildConf.ctx}config/`,
      constants: `${buildConf.ctx}${buildConf.srcDir}js/constants/`,
      js: `${buildConf.ctx}${buildConf.srcDir}js/`,
      utils: `${buildConf.ctx}${buildConf.srcDir}js/utils/`,
    }
  }
}
