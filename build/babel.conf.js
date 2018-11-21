/**
 * babel 配置
 */
module.exports = api => {
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
  ]
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
      },
    ]
  ]

  // 应单独配置开发/生产环境缓存，但是当前 webpack build 文件的 process.env.NODE_ENV 不存在
  api.cache.never()

  return {
    plugins,
    presets,
  }
}