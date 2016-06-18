var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var precss       = require('precss')
var autoprefixer = require('autoprefixer')

var config = require(__dirname + '/src/Config/' + process.env.NODE_ENV)

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: __dirname + '/dist',
		filename: 'js/index.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
			{ test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&mimetype=application/font-woff' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
			{ test: /\.png(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
			{ test: /\.jpe?g(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=image/svg+xml' },
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
			{ test: /\.json$/, loaders: ['json-loader'] },
			{ test: /\.hbs$/, loader: 'handlebars-loader' }
		]
	},
	postcss: function()  {
		return [precss, autoprefixer]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],
		modulesDirectories: ['node_modules', 'src'],
		alias: {
			config: __dirname + '/src/Config/' + process.env.NODE_ENV
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.hbs',
			inject: 'body',
			config: config
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			config: 'config',
			_: 'lodash',
			Immutable: 'immutable',
			http: 'axios',
			Numeral: 'numeral',
			Promise: 'bluebird',
			moment: 'moment'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	devServer: {
		port: 8086
	},
	devtool: 'source-map',
	node: {
		//console: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}
