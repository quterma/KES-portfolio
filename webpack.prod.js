const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
const buildPath = path.resolve(__dirname, 'dist');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
    libraryTarget: 'var',
    library: 'EntryPoint'
  },
  entry: {
    index: './src/js/index.js',
  },
  devServer: {
    port: 8080
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/images", to: "images" },
        { from: "src/docs", to: "docs" },
        { from: "src/robots.txt" },
        { from: "src/sitemap.xml" },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/articles.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'articles.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/awards.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'awards.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/current.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'current.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grants.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'grants.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/media.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'media.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/publications.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'publications.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      }),
      new CssMinimizerPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(jpg|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]'
        }
      },
      {
        test: /\.(pdf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'docs/[hash][ext]'
        }
      }
    ]
  },
};
