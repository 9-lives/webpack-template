const htmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const buildConf = require('./build.conf')
const webpackConf = {
  dev: require('./webpack.dev.conf'),
  prod: require('./webpack.prod.conf')
}

module.exports = env => {
  const isProd = env === 'production'

  const webpackBuildConf = merge({
    context: path.join(__dirname, '..'),
    entry: {
      index: './src/js/pages/index.js'
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
              loader: isProd ? miniCssExtractPlugin.loader : 'style-loader',
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
                resources: ['src/css/global/var.scss'],
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
          exclude: /dist|node_modules/,
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: file => {
                  const imgsDir = `${buildConf.assetsDir}${buildConf.imgsSubDir}`
                  const imgDir = path.dirname(file).replace(new RegExp(`\\${path.sep}`, 'g'), '/') // 图片所在路径
                  const relPath = imgDir.substr([imgDir.indexOf(imgsDir) + imgsDir.length]) // 当前图片与项目图片资源目录的路径之差

                  return `${isProd ? `${imgsDir}${relPath}/` : '[path]'}[hash].[ext]`
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
    },
    resolve: {
      alias: {
        'api': path.join(__dirname, '../src/js/api'),
        'assets': path.join(__dirname, '../src/assets'),
        'biz': path.join(__dirname, '../src/js/biz'),
        'common': path.join(__dirname, '../src/js/common'),
        'constants': path.join(__dirname, '../src/js/constants'),
        'css': path.join(__dirname, '../src/css'),
        'entities': path.join(__dirname, '../src/js/entities'),
        'html': path.join(__dirname, '../src/html'),
        'js': path.join(__dirname, '../src/js'),
      },
    },
    plugins: [
      new htmlWebpackPlugin({
        favicon: './src/favicon.ico',
        filename: 'html/index.html',
        template: 'src/html/index.html'
      }),
    ],
  }, webpackConf[isProd ? 'prod' : 'dev'])

  return webpackBuildConf
}
