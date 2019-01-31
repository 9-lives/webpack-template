const miniCssExtPlugin = require('mini-css-extract-plugin')
const path = require('path')
const buildConf = require('./build.conf')
const {
  getAlias,
  injectPgs,
  pathSepToPosix,
} = require('./utils')


/**
 * webpack 配置
 */
module.exports = {
  context: buildConf.ctx,
  entry: {
    'main': `./${buildConf.srcDir}js/main.js`,
    ...injectPgs.entries(),
  },
  module: {
    rules: getModuleRules()
  },
  output: {
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    filename: 'js/[name].[hash].js',
    path: `${buildConf.ctx}${buildConf.optPath}`,
    publicPath: '/',
  },
  resolve: {
    alias: getAlias(),
  },
  plugins: [
    ...injectPgs.htmlWpkPlugin(),
  ],
}

/**
 * 设置模块解析规则
 */
function getModuleRules() {
  return [
    getEslintLoader(),
    getBabelLoader(),
    getCssLoader(),
    getHtmlLoader(),
    getSvgSpritesLoader(),
    getUrlLoader(),
  ]

  function getBabelLoader() {
    return {
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
      }, ]
    }
  }

  function getCssLoader() {
    return {
      test: /\.(sa|sc|c)ss$/,
      use: [{
          loader: process.env.NODE_ENV === 'production' ? miniCssExtPlugin.loader : 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 3,
          }
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              `${buildConf.srcDir}${buildConf.uiDir}styles/global/color.scss`,
              `${buildConf.srcDir}${buildConf.uiDir}styles/global/var.scss`,
              `${buildConf.srcDir}${buildConf.uiDir}styles/global/funs.scss`,
              `${buildConf.srcDir}${buildConf.uiDir}styles/global/mixins.scss`,
            ],
            sourceMap: true,
          },
        }
      ]
    }
  }

  function getEslintLoader() {
    return {
      enforce: 'pre',
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: 'eslint-loader',
      }]
    }
  }

  function getHtmlLoader() {
    return {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }
  }

  function getSvgSpritesLoader() {
    return {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'ic-[name]',
        },
      }]
    }
  }

  function getUrlLoader() {
    return {
      exclude: /node_modules/,
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: buildConf.maxSzToBase64,
          // 生产环境保留 assets 内图片目录的结构
          name: file => {
            const imgsDir = `${buildConf.assetsDir}${buildConf.imgsSubDir}` // 图片资源目录。例 assets/imgs/
            const imgDir = `${pathSepToPosix(`${path.dirname(file)}/`)}` // 图片所在路径。例 D:/webpackSample/src/assets/imgs/icons/
            const relPath = `${imgDir.substr([imgDir.indexOf(imgsDir) + imgsDir.length])}` // 当前图片与项目图片资源目录的路径之差。例 ''(imgs 目录) 或 'icons'(icons 子目录)

            return `${process.env.NODE_ENV === 'production' ? `${imgsDir}${relPath}` : '[path]'}[hash].[ext]`
          },
        }
      }]
    }
  }
}