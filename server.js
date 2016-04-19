const webpack = require('webpack');
const wds = require('webpack-dev-server');
const config = require('./webpack.config');

const HOST = 'localhost';
const PORT = 3001;

new wds(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
}).listen(PORT, HOST, err => {
    console.log(err || `Listening at ${HOST}:${PORT}`);
})