const HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
const path = require('path');
const  ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

function common(env)
{
    return {
        entry:{
          index:'./src/index.tsx'
        },
        output: {
          filename: '[name].js',
          chunkFilename: '[name].bundle.js',
          path: path.resolve(__dirname, 'static')
        },
        //output:'./dist/main.js',
        resolve: {
          extensions: ['.ts', '.tsx', '.js']
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
              test:/\.(ts|tsx)$/,
              exclude: /node_modules/,
              use:{
                loader:'awesome-typescript-loader'
              }
          }
          ,
            { 
              test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, 
              use: {
                loader:'file-loader',
                options:{
                  name (file) {
                    if (env === 'development') {
                      return '[path][name].[ext]'
                    }
              
                    return '[hash].[ext]'
                  }
                }
              }
             
             },
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: "[name]_[local]_[hash:base64].[ext]",
                  sourceMap: true,
                  minimize: true
                }
              }
            ]
          },
          {
            test: /\.less$/,
            loader: 'less-loader', // compiles Less to CSS
          },
          {
            test: /\.scss$/,
              use: [{
                loader: "style-loader"
              }, {
                loader: "css-loader" ,
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: "[name]_[local]_[hash:base64].[ext]",
                  sourceMap: true,
                  minimize: true
                }
              }, {
                loader: "sass-loader",
                options:{
                  modules: true,
                  importLoaders: 1,
                  localIdentName: "[name]_[local]_[hash:base64].[ext]",
                  sourceMap: true,
                  minimize: true
                }
              }]
        }
          
        ]
      },
      plugins: [
      htmlWebpackPlugin, 
        new webpack.HotModuleReplacementPlugin()
      ]
  }
  
}

module.exports = common;