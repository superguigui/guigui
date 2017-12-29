module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: __dirname,
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
      }
    ]
  }
}
