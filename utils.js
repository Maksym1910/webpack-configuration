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

const generateHtmlWebpackPlugins = (pages, pagesDir) => {
  return pages.map((page) => {
    const pageDir = page.replace(/\.pug/, '');
    return new HtmlWebpackPlugin({
      filename: `./${page.replace(/\.pug/, '.html')}`,
      template: `${pagesDir}${pageDir}/${page}`,
    });
  });
};

module.exports = {
  cssLoaders,
  generateHtmlWebpackPlugins,
};
