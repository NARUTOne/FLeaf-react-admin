/**
 * webpack production config
 */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //能够删除未引用代码(dead code)的压缩工具(minifier)
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var OfflinePlugin = require('offline-plugin'); //离线缓存 体验

var baseWebpackConfig = require('./webpack.base.config');
var paths = require('./script/paths');

var prodConfig = merge(baseWebpackConfig, {
  entry: {
    vendor: ['react', 'react-dom', 'mockjs'],
    charts: ['echarts']
  },
  devtool: false,
	plugins: [
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: { 
          warnings: false
        }
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // new OfflinePlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, paths.buildPath , 'index.html'),
      template: 'template.html',
      inject: true, // 注入
      favicon: path.join(__dirname, 'favicon.ico'),
      minify: {
        removeComments: true, //带HTML注释
        collapseWhitespace: true, //文本节点出现的空白而崩溃
        removeAttributeQuotes: true //删除属性引用
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'charts'],
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // ( 公共chunk(commnons chunk) 的名称)
      name: "commons",
      // ( 公共chunk 的文件名)
      filename: "commons.[chunkhash:4].js",
      children: true,
      // (模块必须被 3个 入口chunk 共享)
      minChunks: 3
    })
	]
});

module.exports = prodConfig;