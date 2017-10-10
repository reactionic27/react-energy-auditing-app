require("posix").setrlimit("nofile", {soft: 10048})
const {NODE_HOST, PORT, WEBPACK_PORT} = process.env

import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import livereload from 'livereload'
import webpackConfig from '../../../webpack.config.js'

// Run the webpack dev server
new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'http://' + NODE_HOST + ':' + WEBPACK_PORT + '/',
  // noInfo: true,
  hot: true,
  stats: {
    cached: false,
    cachedAssets: false,
    colors: true,
    modules: false,
    chunkModules: false,
    errorDetails: true
  },
  headers: {
    "Access-Control-Allow-Origin": "http://" + NODE_HOST + ":" + PORT
  }
}).listen(WEBPACK_PORT, process.env.NODE_HOST, function(err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  console.log(`Webpack server listening on port ${WEBPACK_PORT}, please wait for initial build.`)
});

// Watch public dir with livereload
var lr = livereload.createServer({
  port: 3005
});
lr.watch(path.join(__dirname, '/../../../modules'));
