const HTMLWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  module: {
  	rules: [
  		{
  			test: '/\.js$/',
  			exclude: /node_modules/,
  			loader: 'babel-loader'
  		},
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader' ]
      }      
  	]
  },
  plugins: [
	new HTMLWebPackPlugin({
		template: './src/client/html/index.html',
		filename: 'index.html'
		}
	),
  new CleanWebpackPlugin({
        dry: true,
        verbose: true,
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
})
]
};
