const htmlWpkPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const miniCssExtPlugin = require('mini-css-extract-plugin')
const path = require('path')
const utils = require('./utils')

const buildConf = require('./build.conf')
const wpkConf = {
  dev: require('./wpk.dev.conf'),
  prod: require('./wpk.prod.conf')
}

/**
 * webpack 配置
 */
module.exports = env => {
  const isProd = env === 'production'

  let wpkBuildConf = merge({
    context: buildConf.context,
    entry: {
      main: `./${buildConf.srcDir}js/main.js`,
    },
    module: {
      rules: [
        {
          include: /src\/js/,
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // ?bug: configFile 'build/babel.conf.js' 无效，改为 ./
                configFile: './build/babel.conf.js'
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                configFile: 'build/.eslintrc.js'
              }
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
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
                resources: [`${buildConf.srcDir}${buildConf.cssDir}global/var.scss`],
              },
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          exclude: /node_modules/,
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: file => {
                  const imgsDir = `${buildConf.assetsDir}${buildConf.imgsSubDir}` // 图片资源目录。例 assets/imgs/
                  const imgDir = `${utils.pathSepToPosix(`${path.dirname(file)}/`)}` // 图片所在路径。例 D:/webpackSample/src/assets/imgs/icons/
                  const relPath = `${imgDir.substr([imgDir.indexOf(imgsDir) + imgsDir.length])}` // 当前图片与项目图片资源目录的路径之差。例 ''(imgs 目录) 或 'icons'(icons 子目录)

                  return `${isProd ? `${imgsDir}${relPath}` : '[path]'}[hash].[ext]`
                },
                limit: 4096,
                publicPath: '/',
              }
            },
          ]
        }
      ]
    },
    output: {
      chunkFilename: 'js/[name].[chunkhash].chunk.js',
      filename: 'js/[name].[hash].js',
      path: `${buildConf.context}${buildConf.optPath}`,
    },
    resolve: {
      alias: {
        'api': path.join(__dirname, `../${buildConf.srcDir}js/api`),
        'assets': path.join(__dirname, `../${buildConf.srcDir}${buildConf.assetsDir}`),
        'constants': path.join(__dirname, `../${buildConf.srcDir}js/constants`),
        'css': path.join(__dirname, `../${buildConf.srcDir}${buildConf.cssDir}`),
        'html': path.join(__dirname, `../${buildConf.srcDir}${buildConf.htmlDir}`),
        'js': path.join(__dirname, `../${buildConf.srcDir}js`),
        'utils': path.join(__dirname, `../${buildConf.srcDir}js/utils`),
      },
    },
    plugins: [
      new htmlWpkPlugin({
        favicon: 'favicon.ico',
        filename: `${buildConf.htmlDir}index.html`,
        template: `${buildConf.srcDir}${buildConf.htmlDir}index.html`,
      }),
    ],
  }, wpkConf[isProd ? 'prod' : 'dev'])

  wpkBuildConf = utils.addMulPg({
    wpkConf: wpkBuildConf,
  })

  return wpkBuildConf
}
