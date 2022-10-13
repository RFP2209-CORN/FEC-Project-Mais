require("dotenv").config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'client/src', 'index.js'),
  output: {
    path: path.resolve(__dirname, "client/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client/src", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": {
        GITHUB_API_KEY: JSON.stringify(process.env.GITHUB_API_KEY),
      },
    }),
  ],
}
