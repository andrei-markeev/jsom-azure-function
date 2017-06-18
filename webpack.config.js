var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        'csom-node': './node_modules/csom-node/lib/csom-loader.js'
    },
    output: {
        path: __dirname + '/build',
        libraryTarget: 'commonjs2',
        filename: 'node_modules/[name].js'
    },
    target: 'node',
    node: {
        __dirname: false
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/csom-node/lib/sp_modules', to: 'node_modules/sp_modules' },
            { from: 'node_modules/csom-node/lib/auth/SAML.xml', to: 'node_modules' },
            { from: '*.js', ignore: ["webpack.config.js", "testlocal.js"] },
            { from: 'function.json' }
        ])
    ]
};