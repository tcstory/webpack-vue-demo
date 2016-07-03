var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');

var config = require('./webpack.config');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:9999/", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true,
    publicPath: "/",
    contentBase: './dist/',
    stats: {colors: true}
});

server.listen(9999, "localhost");
