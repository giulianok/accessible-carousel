var path = require('path');

module.exports = {
    entry: './app/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '_public/js')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '']
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
        ]
    }
};