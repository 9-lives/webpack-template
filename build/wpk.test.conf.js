const merge = require('webpack-merge')
const baseConf = require('./wpk.base.conf')

/**
 * webpack 单元测试配置
 */
module.exports = merge(baseConf, {
  devtool: 'inline-source-map',
  mode: 'development',
  optimization: {
    nodeEnv: 'test',
  },
})
