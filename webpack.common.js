const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  cssLoaders,
  generateHtmlWebpackPlugins,
} = require('./utils');

const pagesDir = './src/pages/';
const pages = fs
    .readdirSync(pagesDir)
    .map((pageDir) => {
      return fs.readdirSync(`${pagesDir}${pageDir}`)
          .filter((fileName) => fileName.endsWith('.pug'));
    })
    .flat();
const generatedHtmlForPages = generateHtmlWebpackPlugins(pages, pagesDir);

module.exports = {
  entry: {
    index: ['@babel/polyfill', './src/pages/index/index.js'],
    blog: ['@babel/polyfill', './src/pages/blog/blog.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    ...generatedHtmlForPages,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(jpg|svg|jpeg|png|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
    ],
  },
};
