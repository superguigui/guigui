var path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    filename: 'bundle.js',
    path: './demo'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    compress: false,
    port: 9000,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}