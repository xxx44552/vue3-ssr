const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ target }) => {

  const plugins = [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ];
  const output = {
    path: target === 'server' ? path.resolve(__dirname, '../dist/server') : path.resolve(__dirname, '../dist/client'),
        filename: 'js/chunk-[contenthash:8].js',
        publicPath: '/',
  }
  if (target === 'server') {
    plugins.push(new WebpackManifestPlugin({
      fileName: 'ssr-manifest.json'
    }), new MiniCssExtractPlugin())
    Object.assign(output, {
      libraryTarget: 'commonjs2',
    })
  }

  return {
    mode: 'production',
    entry: {
      main: target === 'server' ? path.resolve(__dirname, '../src/entry-server.js') : path.resolve(__dirname, '../src/entry-client.js'),
    },
    output,
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins,
  }
}

