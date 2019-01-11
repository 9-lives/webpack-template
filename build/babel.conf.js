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

  api.cache(() => process.env.NODE_ENV === 'development')

  return {
    plugins,
    presets,
  }
}