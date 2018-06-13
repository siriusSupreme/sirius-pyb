module.exports = {
  config: {
    mode: 'single', // single multiple all
    basePath: './src/',
    cacheGroups: ['manifest', 'vendors', 'commons'],
    commonEntry: ['babel-polyfill'],
    defaultTitle: 'sirius',
    defaultTemplateName: 'index.html',
    defaultTemplateFile: './src/pages/index.html'
  },
  seo: {
    src: {
      title: 'pretty-src',
      fileName: 'spa'
    },
    index: {
      title: 'index',
      entry: []
    },
    login: {
      title: 'login',
      templateName: 'login.html',
      fileName: 'login.html'
    }
  }
}
