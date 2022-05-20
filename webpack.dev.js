const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    publicPath: 'auto',
  },
  entry: {
    index: './src/js/index.js'
  },
  devServer: {
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/articles.html',
      inject: true,
      chunks: ['index'],
      filename: 'articles.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/awards.html',
      inject: true,
      chunks: ['index'],
      filename: 'awards.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/current.html',
      inject: true,
      chunks: ['index'],
      filename: 'current.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grants.html',
      inject: true,
      chunks: ['index'],
      filename: 'grants.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/media.html',
      inject: true,
      chunks: ['index'],
      filename: 'media.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/publications.html',
      inject: true,
      chunks: ['index'],
      filename: 'publications.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  },
};
