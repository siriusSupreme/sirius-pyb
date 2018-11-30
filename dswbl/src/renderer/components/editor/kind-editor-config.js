let basePath = ''

export default {
  width: 650,
  height: 100,
  minWidth: 650,
  minHeight: 100,
  designMode: true,
  noDisableItems: [ 'source', 'fullscreen' ],
  items: [
    'preview', 'print', 'cut', 'copy', 'paste', 'selectall', '|', 'undo', 'redo', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', '|', 'fullscreen'
  ],
  filterMode: true,
  htmlTags: {
    p: [
      'id', 'class', 'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
      '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
    ],
    br: [ 'id', 'class' ]
  },
  fullscreenMode: false,
  wellFormatMode: true,
  shadowMode: true,
  loadStyleMode: true,
  basePath: basePath,
  themesPath: basePath + 'themes/',
  langPath: basePath + 'lang/',
  pluginsPath: basePath + 'plugins/',
  themeType: 'default', // default, simple
  langType: 'zh-CN',
  urlType: '', // "", relative, absolute, domain
  newlineTag: 'p', // p, br
  resizeType: 0, // 0, 1, 2
  syncType: 'form', // "", form
  pasteType: 1, // 0:none, 1:text, 2:HTML
  dialogAlignType: 'page', // page, editor
  useContextmenu: true,
  fullscreenShortcut: false,
  bodyClass: 'ke-content',
  indentChar: '\t', // \t, "  "
  cssPath: '', //String or Array
  cssData: '',
  minChangeSize: 50,
  zIndex: 811213,
  colorTable: [
    [ '#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500' ],
    [ '#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF' ],
    [ '#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE' ],
    [ '#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000' ]
  ],
  fontSizeTable: [ '9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px' ],
  layout: '<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'
}
