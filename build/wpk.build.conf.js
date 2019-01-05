const merge = require('webpack-merge')
const miniCssExtPlugin = require('mini-css-extract-plugin')
const path = require('path')

const buildConf = require('./build.conf')
const wpkConf = {
  dev: require('./wpk.dev.conf'),
  prod: require('./wpk.prod.conf')
}

const utils = require('./utils')

let isProd

/**
 * webpack 配置
 */
module.exports = env => {
  isProd = env === 'production'

  const wpkBuildConf = {
    context: buildConf.ctx,
    entry: {
      'main': `./${buildConf.srcDir}js/main.js`,
      ...utils.injectPgs.entries(),
    },
    output: {
      chunkFilename: 'js/[name].[chunkhash].chunk.js',
      filename: 'js/[name].[hash].js',
      path: `${buildConf.ctx}${buildConf.optPath}`,
      publicPath: '/',
    },
    plugins: [
      ...utils.injectPgs.htmlWpkPlugin(),
    ],
  }

  setAlias(wpkBuildConf)
  setLoaders(wpkBuildConf)

  return merge(wpkBuildConf, wpkConf[isProd ? 'prod' : 'dev'])
}

/**
 * 设置路径别名
 */
function setAlias(conf) {
  if (typeof conf.resolve !== 'object') {
    conf.resolve = {}
  }

  conf.resolve.alias = {
    api: `${buildConf.ctx}${buildConf.srcDir}js/api/`,
    assets: `${buildConf.ctx}${buildConf.srcDir}${buildConf.assetsDir}`,
    config: `${buildConf.ctx}config/`,
    constants: `${buildConf.ctx}${buildConf.srcDir}js/constants/`,
    html: `${buildConf.ctx}${buildConf.srcDir}${buildConf.htmlDir}`,
    js: `${buildConf.ctx}${buildConf.srcDir}js/`,
    styles: `${buildConf.ctx}${buildConf.srcDir}${buildConf.stylesDir}`,
    utils: `${buildConf.ctx}${buildConf.srcDir}js/utils/`,
  }
}

/**
 * 设置 loaders
 */
function setLoaders(conf) {
  if (typeof conf.module !== 'object') {
    conf.module = {}
  }

  const rules = []

  setEslintLoader(rules)
  setBabelLoader(rules)
  setCssLoader(rules)
  setHtmlLoader(rules)
  setUrlLoader(rules)

  conf.module.rules = rules

  function setBabelLoader(rules) {
    rules.push({
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          // ?bug: configFile 'build/babel.conf.js' 无效，改为 ./
          configFile: './build/babel.conf.js'
        }
      }, ]
    })
  }

  function setCssLoader(rules) {
    rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [{
          loader: isProd ? miniCssExtPlugin.loader : 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 3,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'build'
            }
          }
        },
        {
          loader: 'sass-loader',
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              `${buildConf.srcDir}${buildConf.stylesDir}global/color.scss`,
              `${buildConf.srcDir}${buildConf.stylesDir}global/var.scss`,
              `${buildConf.srcDir}${buildConf.stylesDir}global/funs.scss`,
              `${buildConf.srcDir}${buildConf.stylesDir}global/mixins.scss`,
            ],
            sourceMap: true,
          },
        }
      ]
    })
  }

  function setEslintLoader(rules) {
    rules.push({
      enforce: 'pre',
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: 'build/.eslintrc.js'
        }
      }]
    })
  }

  function setHtmlLoader(rules) {
    rules.push({
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    })
  }

  function setUrlLoader(rules) {
    rules.push({
      exclude: /node_modules/,
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: buildConf.maxSzToBase64,
          // 生产环境保留 assets 内图片目录的结构
          name: file => {
            const imgsDir = `${buildConf.assetsDir}${buildConf.imgsSubDir}` // 图片资源目录。例 assets/imgs/
            const imgDir = `${utils.pathSepToPosix(`${path.dirname(file)}/`)}` // 图片所在路径。例 D:/webpackSample/src/assets/imgs/icons/
            const relPath = `${imgDir.substr([imgDir.indexOf(imgsDir) + imgsDir.length])}` // 当前图片与项目图片资源目录的路径之差。例 ''(imgs 目录) 或 'icons'(icons 子目录)

            return `${isProd ? `${imgsDir}${relPath}` : '[path]'}[hash].[ext]`
          },
        }
      }]
    })
  }
}
