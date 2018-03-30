'use strict'

const path = require( 'path' );
const fs = require( 'fs' );
const glob = require( 'glob' );
const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const files = glob.sync( './src/pages/*/*.js' );

function getEntries () {
  let entries = {};

  files.forEach( function ( file, index ) {
    const page = path.basename( path.dirname( file ) );
    entries[ page ] = [ 'babel-polyfill', 'bootstrap-loader' ].concat( file );
  } );

  return entries;
}


function getPlugins ( optimize = false ) {
  let plugins = [];
  let pages = [];

  let options = {
    filename: '',
    template: '',
    // chunks:['manifest','vendor','app'],
    chunks  : [],
    inject  : true,
    xhtml   : true,

    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  };

  if ( optimize ) {
    options = webpackMerge( options, {
      minify: {
        collapseBooleanAttributes  : true,
        //collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash           : true,
        minifyCSS                  : true,
        minifyJS                   : true,
        minifyURLs                 : true,
        removeAttributeQuotes      : true,
        //removeComments:true,
        removeEmptyAttributes      : true,
        removeRedundantAttributes  : true,
        sortAttributes             : true,
        sortClassName              : true,
        useShortDoctype            : true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    } )
  }

  files.forEach( function ( file, index ) {
    const basename = path.basename( file, '.js' );
    const dirname = path.dirname( file );
    const page = path.basename( dirname );

    options.filename = page + '.html';
    options.template = dirname + '/index.html';
    // options.chunks.push.apply(options.chunks,['common',page]);
    options.chunks = [ 'manifest', 'vendor', 'common' ].concat( page );

    const htmlWebpackPlugin = new HtmlWebpackPlugin( options );

    pages.push( page );
    plugins.push( htmlWebpackPlugin );
  } );

  const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin( {
                                                                        name     : 'common',
                                                                        filename : 'common',
                                                                        chunks   : pages,
                                                                        minChunks: pages.length
                                                                      } );
  const asyncCommonsChunkPlugin=new webpack.optimize.CommonsChunkPlugin({
                                                                     names: pages,
                                                                     async: 'vendor-async',
                                                                     children: true,
                                                                     minChunks: 3
                                                                   });

  return plugins.concat( [commonsChunkPlugin,asyncCommonsChunkPlugin] );
}


module.exports = {
  getEntries, getPlugins
}
