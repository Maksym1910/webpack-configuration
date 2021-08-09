'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = (loader) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];
  if (loader) {
    loaders.push(loader);
  }
  return loaders;
};

const generateHtmlWebpackPlugin = (page) => {
  return new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: `./src/pages/${page}/${page}.pug`,
  });
};

module.exports = {
  cssLoaders,
  generateHtmlWebpackPlugin,
};

