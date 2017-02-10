var path = require('path');
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            'test/**/*.spec.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/**/*.spec.ts': ['webpack']
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-coverage-istanbul-reporter'
        ],
        reporters: [
            'progress',
            'coverage-istanbul'
        ],
        coverageIstanbulReporter: {
            reports: ['html'], // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/master/lib
            dir: './coverage', // output directory
            fixWebpackSourcePaths: true // if using webpack and pre-loaders, work around webpack breaking the source path
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.ts(x?)$/,
                        loader: 'ts-loader'
                    },
                ],
                postLoaders: [ { //delays coverage til after tests are run, fixing transpiled source coverage error
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)\//,
                    loader: 'istanbul-instrumenter' }
                ]
            },
            resolve: webpackConfig.resolve
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};