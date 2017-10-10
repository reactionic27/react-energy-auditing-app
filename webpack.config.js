require('dotenv').load()
const path = require('path')

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_STAGING = process.env.NODE_ENV === 'staging'
const IS_PRODUCTION = process.env.NODE_ENV === 'production' && !process.env.HEROKU_STAGING

process.env.BABEL_ENV = IS_DEV ? 'client_development' : 'client_production'

const CompressionPlugin = require('compression-webpack-plugin')
const UnusedFilesWebpackPlugin = require("unused-files-webpack-plugin"); // eslint-disable-line

// webpack.config.js
const webpack = require('webpack')

const prepend = IS_DEV ? [
  // 'react-hot-loader/patch'
  'webpack-dev-server/client?http://' + process.env.NODE_HOST + ':' + process.env.WEBPACK_PORT,
  'webpack/hot/dev-server',
  './src/js/raf',
  'babel-polyfill'
] : [
  './src/js/raf',
  'babel-polyfill'
]

const entries = {
  app: prepend.concat('./modules/app/index'),
  styles: prepend.concat('./modules/entry/styles.js'),
  register: prepend.concat('./modules/entry/register.js')
}

module.exports = {
  debug: IS_DEV ? true : void 0,
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, '/.build/dist/src/'),
    publicPath: '/src/',
    filename: IS_DEV ? '[name].js' : '[name]-[hash].js',
    sourceMapFilename: '[file].map',
    // hideModules: true,
    colors: true,
    // devtoolModuleFilenameTemplate: 'subl://open?url=file://[absolute-resource-path]'
  },
  module: {
    noParse: [
      /node-uuid/
    ],
    loaders: [{
      exclude: /node_modules/,
      test: /\.less$/,
      loaders: [
        "style-loader",
        "css-loader",
        "less-loader"
      ]
    }, {
      include: /node_modules\/(codemirror|react\-json\-inspector)/,
      test: /\.css$/,
      loaders: [
        "style-loader",
        "css-loader"
      ]
    }, {
      exclude: /node_modules/,
      test: /\.css$/,
      loaders: [
        "style-loader",
        "css-loader"
      ]
    }, {
      test: /\.(js|jsx)$/,
      include: [
        /node_modules\/checkit/,
        /node_modules\/react-router/,
        /node_modules\/react-redux/,
        /node_modules\/lodash-es/,
        /node_modules\/simple-selectors/,
        /node_modules\/redux/,
        /node_modules\/immutable-diff/,
        /draft-wysiwyg/
      ],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true
      }
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true
      }
    },
    {
      test: /\.json$/,
      loader: "json-loader"
    },
    {
      exclude: /node_modules/,
      test: /\.(png|jpg|ttf|woff|svg|otf|eot|svg).*?$/,
      loader: "file-loader"
    },
    ]
  },
  resolve: {
    alias: {
      'checkit': 'checkit/src/checkit',
      'checkit/lang/es': 'lodash/noop',
      'checkit/lang/ru': 'lodash/noop',
      'checkit/lang/fr': 'lodash/noop',
      'transit-js': IS_DEV
        ? 'bower-transit-js/transit-amd'
        : 'bower-transit-js/transit-amd-min'
    },
    extensions: ['', '.js', '.json', '.jsx'],
    modules: [
      path.resolve(__dirname, 'modules'),
      'node_modules'
    ],
    packageMains: ["webpack", "jsnext:main", "browser", "web", "browserify", ["jam", "main"], "main"]
  },
  plugins: [
    // new UnusedFilesWebpackPlugin({
    //   pattern: 'modules/**/*.*',
    //   ignore: '__tests__/*.*'
    // }),
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "stats.json"),
          JSON.stringify(stats.toJson().assetsByChunkName)
        );
      });
    },
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin("commons"),
    new webpack.DefinePlugin({
      IS_DEV:  process.env.NODE_ENV === 'development',
      IS_STAGING:  process.env.NODE_ENV === 'staging',
      IS_PRODUCTION: process.env.NODE_ENV === 'production'
    })
  ].concat(
    IS_DEV
      ? [
        new webpack.DefinePlugin({
          IS_DEV: true,
          __DEBUG__: true,
          INTERCOM_APP_ID: JSON.stringify("uqbbgb7o"),
          UPLOADCARE_PUBLIC_KEY: '"062b492496dd252f4da9"',
          STRIPE_PUBLIC_KEY: '"' + process.env.STRIPE_PUBLIC_KEY + '"',
          'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
      ]
      : [
        new webpack.DefinePlugin({
          IS_DEV: false,
          IS_STAGING: true,
          __DEBUG__: IS_STAGING,
          INTERCOM_APP_ID: JSON.stringify(IS_PRODUCTION ? "mkemf73s" : "uqbbgb7o"),
          UPLOADCARE_PUBLIC_KEY: '"062b492496dd252f4da9"',
          STRIPE_PUBLIC_KEY: '"' + process.env.STRIPE_PUBLIC_KEY + '"',
          'process.env.NODE_ENV': '"production"'
        }),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ].concat(new webpack.optimize.UglifyJsPlugin({
        compress: true,
        comments: /NO_LICENSE/,
        sourceMap: true
      }))
  ),
  node: {
    fs: "empty"
  }
};
