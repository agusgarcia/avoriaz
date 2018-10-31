const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
 // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const PATHS = {
  // src: path.join(__dirname, '/src'),
  // dist: path.join(__dirname, '/dist'),
  root: path.join(__dirname, '../'),
  assets: path.join(__dirname, '/src/assets/'),
};

// TODO : /!\ Set MB name or null /!\
const MB = null;
// const MB = 'regionv2';

let NAMES;
if (MB) {
  NAMES = {
    js: MB,
    images: `images-mb-${MB}`,
    css: `css-mb-${MB}`,
    chunk: `${MB}-`
  }
} else {
  NAMES = {
    js: 'main',
    images: 'images',
    css: 'css',
    chunk: ''
  }
}
module.exports = {
  entry: {
    main: './src/assets/js/index.js',
  },
  output: {
    path: PATHS.root,
    filename: `js/${NAMES.js}.js`,
    publicPath: './',
    chunkFilename: `js/${NAMES.chunk}[name].bundle.js`
  },

  /*
  webpack will automatically split chunks based on these conditions:
  - New chunk can be shared OR modules are from the node_modules folder
  - New chunk would be bigger than 30kb (before min+gz)
  - Maximum number of parallel requests when loading chunks on demand would be lower or equal to 5
  - Maximum number of parallel requests at initial page load would be lower or equal to 3
*/
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
      //filename: `js/vendors~${NAMES.js}.js`
    }
  },

  module: {
    rules: [
      // If scrollMagic is needed
     /* {
        test: /\.js$/,
        loader: "imports-loader?define=>false"
      },*/
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: MiniCssExtractPlugin.loader, options: {
            publicPath: '../',
          }
        }, 'css-loader', 'postcss-loader', 'sass-loader']
        /** includePaths: [
         path.resolve(__dirname, '../src/app/assets/sass'),
         path.resolve(__dirname, '../node_modules/bootstrap/scss'),
         ] **/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: PATHS.assets,
              name: `${NAMES.images}/[name].[ext]`,
              // Public path modified for 'Maquettes'
              // publicPath: '/',
            },
          }
        ]
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: PATHS.assets,
          },
        }],
        exclude: [`${PATHS.assets}images`],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 1,
          noquotes: true,
          name: `${NAMES.images}/[path][name].[ext]`,
          context: `${PATHS.assets}images`,
        },
        exclude: [`${PATHS.assets}fonts`],
      }/*,
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }*/
    ],
  },
  // If scrollMagic is needed
/*  resolve: {
    extensions: ['.js'],
    alias: {
      "ScrollMagicGSAP": "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
    }
  },*/
  stats: {
    colors: true
  },
  plugins: [
    // new CleanWebpackPlugin('dist', {}),
    // TODO : configurer cleanWebpackPlugin
    // pour les dossiers images (si besoin ?)
    new MiniCssExtractPlugin({
      chunkFilename: `${NAMES.css}/vendor.css`,
      filename: `${NAMES.css}/style.css`
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise'
    }),
    // TODO : add BundleAnalyzerPlugin
    //new BundleAnalyzerPlugin()
  ],
};