var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry:
    {
        ngmainpage: './appConfig/MainAppNg.js',
        requirementpage: './appConfig/RequireMentcfg.js',
    },
    node: {
        __dirname: true
    },
    output: {
        // Absolute output directory
        path: __dirname + '/build',
        chunkFilename: '[name].js',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
          {
              loader: 'babel-loader',
              test: [
                path.join(__dirname, 'appConfig'),
                path.join(__dirname, 'controller'),
                path.join(__dirname, 'model'),
                path.join(__dirname, 'unit'),
                path.join(__dirname, 'services')],
              query: {
                  presets: 'es2015',
              },
          },
          {
              test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
              loader: "imports?this=>window"
          },
          {
              // I want to uglify with mangling only app files, not thirdparty libs
              test: /build\/mainpage\/.*\.js$/,
              exclude: /Scripts/, // excluding .spec files
              loader: "uglify"
          },
        ]
    },
    plugins: [
      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin(),
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
    //resolve jquery
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            'angular': '../node_modules/angular/angular.min',
            'angular-ui-router': '../node_modules/angular-ui-router/release/angular-ui-router.min',
            'angular.animate': '../node_modules/angular-animate/angular-animate.min',
            'ng.ueditor': "../plugins/Ueditor/angular-ueditor",
            'ng.treeView': '../plugins/NgTreeView/abn_tree_directive'
        },
        module: {
            loaders: [
              { test: /angular/, loader: 'expose?angular!expose?Angular' }, //Angular
              { test: /angular-ui-router/, loader: 'exports?angular-ui-router!imports?angular' },
              { test: /ng.ueditor/, loader: 'exports?ng.ueditor!imports?angular' },
              { test: /angular.animate/, loader: 'exports?angular.animate!imports?angular' },
              { test: /ng.treeView/, loader: 'exports?ng.treeView!imports?angular' },
            ]
        }
    },
};
