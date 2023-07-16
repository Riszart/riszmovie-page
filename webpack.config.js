const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry:{
    app:'./src/js/index.js'
  },
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename:'[name].js'
  },
  mode:'production',
  resolve: {
    extensions:['.js']
  },
  module:{
    rules:[
      {
        test:/\.html$/,
        use:['html-loader']
      },
      {
        test:/\.js$/,
        exclude:/node-module|\.vscode/,
        use:{
          loader:'babel-loader'
        }
      },
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
    new Dotenv()
  ],
  optimization:{
    minimize:true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
}