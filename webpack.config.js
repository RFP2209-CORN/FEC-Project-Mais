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
          // options: {
          //   presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
          // }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
      template: path.join(__dirname, "client/src", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": {
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
}

// from the TAA
// module: {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       exclude: /nodeModules/,
//       use: {
//         loader: "babel-loader",
//       },
//     },
//     {
//       test: /\.css$/i,
//       use: ["style-loader", "css-loader"],
//     },
//     {
//       test: /\.(png|svg|jpg|jpeg|gif)$/i,
//       type: "asset/resource",
//     },
//   ],
// },


// from stack overflow
// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //       template: './src/index.html',
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: '[name].css',
  //   }),
  // ],
//   module: {
//     rules: [
//       {
//         test: /\.scss$/,
//         use: [
//             { loader: MiniCssExtractPlugin.loader },
//             'css-loader',
//             'sass-loader'
//         ],
//       },
//     ],
//   },
// };