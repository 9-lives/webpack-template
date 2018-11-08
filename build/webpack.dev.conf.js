const webpack = require('webpack')

module.exports = {
  devServer: {
    contentBase: '/dist',
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: []
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
