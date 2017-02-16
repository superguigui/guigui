var path = require('path');

module.exports = {
  entry: './demo/builded.js',
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
    
  }
}