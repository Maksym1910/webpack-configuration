const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = (loader) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];
  if (loader) {
    loaders.push(loader);
  }
  return loaders;
};

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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './src/pages/index/index.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      chunks: ['blog'],
      template: './src/pages/blog/blog.pug',
    }),
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
