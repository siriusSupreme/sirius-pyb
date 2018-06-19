module.exports = {
  config: {
    mode: 'all', // single multiple all
    basePath: './src/',
    cacheGroups: ['manifest', 'vendors', 'commons'],
    commonEntry: [
      'babel-polyfill',
      '@/assets/js/adapter',
      '@/assets/js/browser-check',
      '@/assets/js/request-animation-frame'
    ],
    includeEntries: [], // 只打包指定的入口文件
    excludeEntries: [], // 不打包指定的入口文件
    defaultTitle: '',
    defaultTemplateName: 'index.html',
    defaultTemplateFile: './src/pages/index.html'
  },
  seo: {
    src: {
      title: 'pretty-src',
      fileName: 'root.html'
    },
    index: {
      title: 'index',
      entry: [],
      templateName: 'index.html',
      fileName: 'index.html'
    }
  }
}
