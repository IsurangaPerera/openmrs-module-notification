/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
// generated on 2018-05-25 using @openmrs/generator-openmrs-owa 0.7.0


const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const env = require('yargs').argv.mode;
const target = require('yargs').argv.target;
const targetPort = require('yargs').argv.targetPort;

const UglifyPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');


const nodeModulesDir = path.resolve(__dirname, '../node_modules');

const THIS_APP_ID = 'openmrs-module-notification';

const plugins = [];
const nodeModules = {};

let outputFile = `.bundle`;
let vendorOutputFile;
let outputPath;

let configJson;
let appEntryPoint;
let localOwaFolder;

let devtool;

const getConfig = function () {
	  let config;

	  try {
	    // look for config file
	    config = require('./config.json');
	  } catch (err) {
	    // create file with defaults if not found
	    config = {
	      LOCAL_OWA_FOLDER: '/home/isurangaperera/openmrs/platform/owa/',
	      APP_ENTRY_POINT: 'http://localhost:8080/openmrs/owa/openmrs-module-notification/index.html',
	    };

	    fs.writeFile('config.json', JSON.stringify(config));
	  } finally {
	    return config;
	  }
};
const config = getConfig();

const resolveBrowserSyncTarget = function () {
  if (targetPort != null && targetPort != 'null') {
    return config.APP_ENTRY_POINT.substr(0, 'http://localhost:'.length)
      + targetPort
      + config.APP_ENTRY_POINT.substr('http://localhost:'.length + targetPort.toString().length, config.APP_ENTRY_POINT.length);
  }

  return config.APP_ENTRY_POINT;
};
const browserSyncTarget = resolveBrowserSyncTarget();

/** Minify for production */
if (env === 'production') {
	  plugins.push(new UglifyPlugin({
	    output: {
	      comments: false,
	    },
	    minimize: true,
	    sourceMap: false,
	    compress: {
	        warnings: false,
	    },
	  }));
	  plugins.push(new DedupePlugin());
	  outputFile = `${outputFile}.min.[chunkhash].js`;
	  vendorOutputFile = "vendor.bundle.[chunkhash].js";
	  outputPath = `${__dirname}/dist/`;
	  plugins.push(new WebpackOnBuildPlugin(((stats) => {
    // create zip file
    const archiver = require('archiver');
    const output = fs.createWriteStream(`${THIS_APP_ID}.zip`);
    const archive = archiver('zip');

    output.on('close', () => {
			    console.log(`distributable has been zipped! size: ${archive.pointer()}`);
    });

    archive.on('error', (err) => {
			    throw err;
    });

    archive.pipe(output);

    archive.directory(`${outputPath}`, '');

    archive.finalize();
		 })));
} else if (env === 'deploy') {
	  outputFile = `${outputFile}.js`;
	  vendorOutputFile = "vendor.bundle.js";
	  outputPath = `${config.LOCAL_OWA_FOLDER}${config.LOCAL_OWA_FOLDER.slice(-1) != '/' ? '/' : ''}${THIS_APP_ID}`;
	  devtool = 'source-map';
} else if (env === 'dev') {
	  outputFile = `${outputFile}.js`;
	  vendorOutputFile = "vendor.bundle.js";
	  outputPath = `${__dirname}/dist/`;
	  devtool = 'source-map';
}

plugins.push(new BrowserSyncPlugin({
  proxy: {
    	target: browserSyncTarget,
  },
}));

plugins.push(new CommonsChunkPlugin({
  name: 'vendor',
  filename: vendorOutputFile,
}));

plugins.push(new HtmlWebpackPlugin({
  template: './app/index.html',
  inject: 'body',
}));

plugins.push(new CopyWebpackPlugin([{
  from: './app/subscriptions.html',
}]));

plugins.push(new CopyWebpackPlugin([{
  from: './app/edit.html',
}]));

plugins.push(new HtmlWebpackPlugin({
  template: './app/subscriptions.html',
  inject: 'body',
}));

plugins.push(new CopyWebpackPlugin([{
  from: './app/manifest.webapp',
}]));

plugins.push(new CopyWebpackPlugin([{
  from: './app/img/omrs-button.png',
  to: 'img/omrs-button.png',
}]));


const webpackConfig = {
  quiet: false,
  entry: {
	  app: `${__dirname}/app/js/openmrs-owa-notification`,
	  css: `${__dirname}/app/css/openmrs-owa-notification.scss`,
	  vendor: [


      'react', 'react-router',

      'redux', 'redux-promise-middleware', 'redux-thunk', 'react-redux',


	            ],
  },
  devtool,
  target,
  output: {
    path: outputPath,
    filename: `[name]${outputFile}`,
  },
  module: {
    loaders: [{
	    test: /\.jsx?$/,
	    loader: 'babel-loader',
	    exclude: /node_modules/,
	    query: {
        presets: ['env', 'react'],
        cacheDirectory: true,
        plugins: ['transform-class-properties', 'transform-object-rest-spread'],
	    },
    }, {
	    test: /\.css$/,
	    loader: 'style-loader!css-loader',
    }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
    }, {
	    test: /\.(png|jpg|jpeg|gif|svg)$/,
	    loader: 'url',
    }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
    }, {
	    test: /\.html$/,
	    loader: 'html',
    }],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx'],
  },
  plugins,
  externals: nodeModules,
};

module.exports = webpackConfig;
