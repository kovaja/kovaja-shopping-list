const HtmlWebPackPlugin = require("html-webpack-plugin");

console.log('KUBA', __dirname+ '/public');

module.exports = {
  entry: './src/client/index.js',
  output: {
		path:  __dirname + '/public',
		filename: 'index.js'
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test:/\.css$/,
        use:['css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html"
    })
  ]
};