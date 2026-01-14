// config/webpack.prod.js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const ROOT_DIRECTORY = process.cwd()

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
  },
  output: {
    path: path.resolve(ROOT_DIRECTORY, 'build'),
    filename: '[name].[contenthash:8].bundle.js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.resolve(ROOT_DIRECTORY, 'config/babel.config.js'),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(
                  ROOT_DIRECTORY,
                  'config/postcss.config.js'
                ),
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(
                  ROOT_DIRECTORY,
                  'config/postcss.config.js'
                ),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, 'src/public/index.html'),
      filename: 'index.html',
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].bundle.css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            comparisons: false,
            ecma: 5,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          format: {
            ascii_only: true,
            comments: false,
            ecma: 5,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
    },
  },
}
