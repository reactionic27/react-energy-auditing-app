/*eslint no-console: 0*/
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
process.env.NODE_ENV = 'test'
process.env.BABEL_ENV = 'client_production'

module.exports = function(config) {
  config.set({

    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha' ],
    reporters: [ 'mocha' ],

    files: [
      './src/js/raven-mock.js',
      './src/js/uploadcare.js',
      './modules/__tests__/tests.webpack.js'
    ],

    preprocessors: {
      './modules/__tests__/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'eval',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: [
        new webpack.ProvidePlugin({
          React: 'react',
          _:     'lodash'
        }),
        new webpack.DefinePlugin({
          IS_DEV: true,
          __DEBUG__: false,
          UPLOADCARE_PUBLIC_KEY: '"062b492496dd252f4da9"',
          STRIPE_PUBLIC_KEY: '"' + process.env.STRIPE_PUBLIC_KEY + '"',
          INTERCOM_APP_ID: '"uqbbgb7o"',
          'process.env.NODE_ENV': JSON.stringify('test')
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      ],
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true
    },

    client: {
      mocha: {
        // bail: true
      }
    }
  })
}
