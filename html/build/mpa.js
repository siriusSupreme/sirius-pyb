'use strict'

const path = require( 'path' );
const fs = require( 'fs' );
const glob = require( 'glob' );
const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const {config,seo} =  require('./mpa-config');
const files = glob.sync( './src/pages/*/*.js' );

function getEntries () {
  let entries = {};

  files.forEach( function ( file, index ) {
    const page = path.basename( path.dirname( file ) );
    let pageEntry=seo[page] && seo[page]['entry'];

    pageEntry=Array.isArray(pageEntry)?pageEntry:[];

    entries[ page ] = config.commonEntry.concat(pageEntry, file );
  } );

  return entries;
}


function getPlugins ( optimize = false ) {
  let plugins = [];
  let pages = [];

  let options = {
    title:'',
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
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash           : true,
        minifyCSS                  : true,
        minifyJS                   : true,
        minifyURLs                 : true,
        removeAttributeQuotes      : true,
        removeComments:true,
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

    const templateName=(seo[page] && seo[page]['templateName']) && config.defaultTemplateName;
    const pageTemplateHtml= dirname + templateName;

    options.title = (seo[page] && seo[page].title) || config.defaultTitle;
    options.filename = (seo[page] && seo[page].fileName) || (page + '.html');
    options.template = fs.existsSync(pageTemplateHtml)?pageTemplateHtml:config.defaultTemplateFile;
    // options.chunks.push.apply(options.chunks,['common',page]);
    options.chunks = [ 'manifest', 'vendor', 'common' ].concat( page );

    const htmlWebpackPlugin = new HtmlWebpackPlugin( options );

    pages.push( page );
    plugins.push( htmlWebpackPlugin );
  } );

  const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin( {
                                                                        name     : 'common',
                                                                        // filename : 'common',
                                                                        chunks   : pages,
                                                                        minChunks: pages.length
                                                                        // minChunks: function ( module, count ) {
                                                                        //   if ( /(assets|static)/.test(module.resource) && !/node_modules/.test(module.resource) ){
                                                                        //     console.log(module.context);
                                                                        //     console.log(module.resource+'========'+count);
                                                                        //   }
                                                                        //
                                                                        //   return (module.context && module.resource && /(assets|static)/.test(module.resource) && !/node_modules/.test(module.resource));
                                                                        // }
                                                                      } );
  const asyncCommonsChunkPlugin=new webpack.optimize.CommonsChunkPlugin({
                                                                     names: pages,
                                                                     async: 'vendor-async',
                                                                     children: true,
                                                                     // deepChildren: true,
                                                                     minChunks: 3
                                                                   });

  return plugins.concat( [commonsChunkPlugin,asyncCommonsChunkPlugin] );
}


module.exports = {
  getEntries, getPlugins
}
