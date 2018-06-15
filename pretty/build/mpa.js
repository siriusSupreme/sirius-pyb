'use strict'

const path = require('path')
const fs = require('fs')
const glob = require('glob')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  dev: { assetsPublicPath }
} = require('../config')
const { config, seo } = require('./mpa-config')
const files = glob.sync(`${config.basePath}pages/*/*.js`)

function getEntries () {
  let entries = {}
  let setEntry = file => {
    let page = path.basename(path.dirname(file))
    let pageEntry = seo[page] && seo[page]['entry']

    pageEntry = Array.isArray(pageEntry) ? pageEntry : []

    entries[page] = config.commonEntry.concat(pageEntry, file)
  }

  // 生成入口文件
  if (config.mode === 'single' || config.mode === 'all') {
    setEntry(`${config.basePath}index.js`)
  }

  if (config.mode === 'multiple' || config.mode === 'all') {
    files.forEach(setEntry)
  }

  return entries
}

function getPlugins (optimize = false) {
  let plugins = []
  let cacheGroups = {}
  let rewrites = []
  let pages = []

  let options = {
    title: '',
    filename: '',
    template: '',
    // templateParameters: {},
    meta: {},
    chunks: [],
    excludeChunks: [],
    inject: true,
    xhtml: true,

    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }

  if (optimize) {
    options = webpackMerge(options, {
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  }

  let setPlugins = file => {
    let dirname = path.dirname(file)
    let page = path.basename(dirname)

    let templateName =
      (seo[page] && seo[page]['templateName']) || config.defaultTemplateName
    let pageTemplateHtml = dirname + '/' + templateName

    options.title = (seo[page] && seo[page].title) || page
    options.filename = (seo[page] && seo[page].fileName) || `${page}.html`
    options.template = fs.existsSync(pageTemplateHtml)
      ? pageTemplateHtml
      : config.defaultTemplateFile
    options.chunks = config.cacheGroups.concat(page)

    let rewrite = {
      from: new RegExp(`^/${options.filename.slice(0, -5)}`),
      to: path.posix.join(assetsPublicPath, options.filename)
    }

    let htmlWebpackPlugin = new HtmlWebpackPlugin(options)

    pages.push(page)
    rewrites.push(rewrite)
    plugins.push(htmlWebpackPlugin)
  }

  // 生成页面
  if (config.mode === 'single' || config.mode === 'all') {
    setPlugins(`${config.basePath}index.js`)
  }

  if (config.mode === 'multiple' || config.mode === 'all') {
    files.forEach(setPlugins)
  }

  // 代码提取
  cacheGroups = {
    commons: {
      name: 'commons',
      priority: 0,
      reuseExistingChunk: true,
      chunks: chunk => {
        return pages.includes(chunk.name)
      },
      minChunks: 2
    }
  }

  return { plugins, cacheGroups, rewrites }
}

module.exports = {
  getEntries,
  getPlugins
}
