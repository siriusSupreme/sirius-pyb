module.exports = {
  config: {
    mode: 'all', // single multiple all
    basePath: './src/',
    cacheGroups: ['manifest', 'vendors', 'commons'],
    commonEntry: [
      'babel-polyfill',
      '@/assets/js/adapter',
      '@/assets/js/request-animation-frame'
    ],
    defaultTitle: 'sirius',
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
