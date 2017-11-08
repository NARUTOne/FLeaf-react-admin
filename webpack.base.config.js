/**
 * webpack base config
 */

var path = require('path');
var webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var paths = require('./script/paths')

var baseConfig = {
	target: 'web', //构建目标
	entry: {
		app: [ path.resolve(__dirname,'script/polyfills.js'), path.resolve(__dirname, 'src/index.js')]
	},
	output: {
		path: path.resolve(__dirname, paths.buildPath),
		filename: 'static/js/[name].[hash].js',
		publicPath: '/',  //按需加载或外部资源 url
		chunkFilename: 'static/js/[id].[chunkhash:8].js' //chunk生成的文件名
	},
	module: {
		rules:[
			{
	      test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				include: [path.resolve(__dirname,'src'), path.resolve(__dirname, "public")],
	      use: {
	        loader: 'babel-loader'
	      }
	    },
	    {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
				test: /\.(png|jpe?g|gif|svg|woff|woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
          {
            loader: 'file-loader',
            options: {
							name: 'static/media/[name].[hash:8].[ext]'
						}
          }
				]
      }
		]
	},
	resolve:{
		extensions: ['.js', '.jsx'],
    alias: {
      public: path.resolve(__dirname, './public'),
      src: path.resolve(__dirname, './src'),
    }
	},
	plugins:[
	 	// new CleanWebpackPlugin(['dist']), // 清除 测试dist
		new webpack.NoEmitOnErrorsPlugin() // 2.x以上；编译时出错，跳过，编译后保错
	]
}

module.exports = baseConfig