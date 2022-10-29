require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'client/src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
          // }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/src', 'index.html'),
      favicon: path.join(__dirname, 'client/src/assets/images/favicon.png')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        GITHUB_API_KEY: JSON.stringify(process.env.GITHUB_API_KEY),
      },
    }),
  ],
  resolve: {
    // extensions: ['', 'js', 'jsx'],
    modules: [
      'node_modules'
    ],
  },
};
