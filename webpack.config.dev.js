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
        generator:{
          filename:'assets/[name][ext]'
        }
      },
      {
        test:/\.(svg|png|jpg|webp)/,
        type:'asset/resource',
        generator:{
          filename:'assets/images/[name][ext]'
        }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      inject:true,
      template:'./src/index.html',
      filename:'./index.html'
    }),
    new Dotenv()
  ],
  devServer: {
    static:path.join(__dirname,'dist'),
    compress:true,
    historyApiFallback:true,
    port:3005,
  },
}