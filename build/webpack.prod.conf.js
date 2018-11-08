const cleanWebpackPlugin = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: []
  },
  plugins: [
    new cleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..')
    }),
    new miniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[chunkhash].chunk.css"
    }),
  ],
}
