var path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'guigui.js',
    path: path.join(__dirname, '/lib'),
    library: 'guigui',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'simple-color-picker': 'simple-color-picker'
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
