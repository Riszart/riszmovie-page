const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:{
    app:'./src/js/index.js'
  },
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename:'[name].js'
  },
  mode:'development',
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
        use:['style-loader', 'css-loader'],
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    }),
    new Dotenv()
  ],
  devServer: {
    static:path.join(__dirname,'dist'),
    compress:true,
    historyApiFallback:true,
    port:3005,
  },
  stats:'verbose'
}