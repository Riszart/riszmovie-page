const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:'./src/index.html',
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename:'main.js'
  },
  resolve: {
    extensions:['.js']
  },
  module:{
    rules:[
      {
        test:/\.html$/,
        use:['html-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    })
  ]
}