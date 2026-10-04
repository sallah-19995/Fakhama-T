const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ThemeWatcher = require('@salla.sa/twilight/watcher.js');
const path = require('path');
const asset = file => path.resolve('src/assets', file || '');
const publicDir = file => path.resolve('public', file || '');
module.exports = {
  entry: { app: [asset('styles/app.scss'), asset('js/app.js')], home: asset('js/home.js'), product: asset('js/product.js'), checkout: asset('js/cart.js') },
  output: { path: publicDir(), clean: true, chunkFilename: '[name].[contenthash].js' },
  module: { rules: [
    { test:/\.js$/, exclude:/node_modules/, use:{loader:'babel-loader',options:{presets:['@babel/preset-env'],plugins:['@babel/plugin-transform-runtime']}} },
    { test:/\.s[ac]ss$/, use:[MiniCssExtractPlugin.loader,{loader:'css-loader',options:{url:false}},'postcss-loader','sass-loader'] }
  ]},
  plugins:[new ThemeWatcher(),new MiniCssExtractPlugin()],
  optimization:{minimizer:['...']}
};
