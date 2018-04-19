module.exports = {
  config: {
    commonEntry        : [ 'babel-polyfill', 'bootstrap-loader', 'font-awesome-loader','assets/js/common.js','assets/stylus/common.styl' ],
    defaultTitle       : 'demo',
    defaultTemplateName: 'index.html',
    defaultTemplateFile: 'src/pages/index.html'
  },
  seo   : {
    'index': {
      title: '公安机关执法办案——案卷管理平台',
      entry: []
    },
    'login': {
      title       : '公安机关执法办案——案卷管理平台——登录界面',
      templateName: 'login.html',
      fileName    : 'login.html'
    }
  }
};
