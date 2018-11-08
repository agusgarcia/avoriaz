// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
};

module.exports = {
  entry: {main: './src/assets/js/index.js'},
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'eslint-loader',
      },
      // If scrollMagic is needed :
     /* {
        test: /\.js$/,
        loader: "imports-loader?define=>false"
      },*/
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: PATHS.src,
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 1,
          noquotes: true,
          name: '[path][name].[ext]',
          context: PATHS.src,
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ],
  },
  // If scrollMagic is needed
  /*resolve: {
    extensions: ['.js'],
    alias: {
      "ScrollMagicGSAP": "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
    }
  },*/
  resolve: {
    modules: ['node_modules'],
    alias: {
      'TweenLite': 'gsap/src/minified/TweenLite.min.js',
      'TweenMax': 'gsap/src/minified/TweenMax.min.js',
      'TimelineLite': 'gsap/src/minified/TimelineLite.min.js',
      'TimelineMax': 'gsap/src/minified/TimelineMax.min.js',
      'ScrollMagic': 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
      'animation.gsap': 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
      'debug.addIndicators': 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
    }
  },
  stats: {
    // Nice colored output
    colors: true
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/edito.html',
      filename: 'edito.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/portail.html',
      filename: 'portail.html'
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise'
    })
    /*
        // Add new page
        // Available @ localhost:8080/listing.html
        new HtmlWebpackPlugin({
          template: './src/listing.html',
          chunks: ['main'],
          filename: 'listing.html'
        }),
    */
  ],
};
