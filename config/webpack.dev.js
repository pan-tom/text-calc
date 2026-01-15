// config/webpack.dev.js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const detectPort = require('detect-port')

/**
 * process.cwd will return a path to our active project directory
 * For example on windows will look like:
 * c:\Users\username\project\webpack-boilerplate
 * On Mac:
 * /Users/username/project/webpack-boilerplate
 */
const ROOT_DIRECTORY = process.cwd()

// Dynamic port configuration
const DEFAULT_PORT = 3000

module.exports = async () => {
  const port = await detectPort(DEFAULT_PORT)

  return {
    /**
     * Define webpack mode
     * Which webpack will set NODE_ENV to 'development'
     * Docs: https://webpack.js.org/configuration/mode/
     */
    mode: 'development',
    /**
     * Here, we tell webpack where entry point of our code
     * If you only have single entry point you can also do it like below
     * entry: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
     * Docs: https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      main: path.resolve(ROOT_DIRECTORY, 'src/index.ts'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    /**
     * Tell webpack where it should output
     * our bundles, assets and anything else
     * In this example it will be inside /build folder
     * Docs: https://webpack.js.org/configuration/output/
     */
    output: {
      path: path.resolve(ROOT_DIRECTORY, 'build'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
    },
    /**
     * This devServer option is our development server that get picked up by webpack-dev-server
     * Docs: https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      // Serves everything from our build folder which is our output folder
      static: {
        directory: path.resolve(ROOT_DIRECTORY, 'build'),
      },
      // Enable gzip compression
      compress: true,
      // Dynamic port - uses DEFAULT_PORT if available, otherwise finds next available
      port,
      // Host available for whole network
      host: '0.0.0.0',
      // This will shows a full-screen overlay in the browser when there are compiler errors
      client: {
        overlay: true,
      },
    },
    /**
     * Generate source-maps to make it easier to track down errors and warnings
     * In this example we're using eval-cheap-module-source-map (webpack 5 equivalent)
     * Docs: https://webpack.js.org/configuration/devtool/
     */
    devtool: 'eval-cheap-module-source-map',
    module: {
      rules: [
        /**
         * Here we are kinda tell webpack if it come accross js file
         * Please use babel-loader
         * Docs: https://github.com/babel/babel-loader
         */
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Faster builds, type checking done separately
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              configFile: path.resolve(
                ROOT_DIRECTORY,
                'config/babel.config.js'
              ),
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            /**
             * style-loader will inject css into the DOM with <style> tag
             */
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // Enable url functions handling in css
                url: true,
                // Enables @import at-rules handling
                import: true,
                // Disable css modules
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
            'style-loader',
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
                  sourceMap: true,
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
        minify: false,
      }),
      new ForkTsCheckerWebpackPlugin({
        // Runs type checking in a separate process, doesn't slow down webpack builds
        typescript: {
          configFile: path.resolve(ROOT_DIRECTORY, 'tsconfig.json'),
        },
      }),
    ],
  }
}
