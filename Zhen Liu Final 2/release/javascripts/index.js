SVG.on( document, 'DOMContentLoaded', function ( e ) {
  var containerDom = document.querySelector( '#menu' )

  _Coordinate.containerDom = containerDom
  _Coordinate.width = containerDom.clientWidth
  _Coordinate.height = containerDom.clientHeight

  // 初始化 SVG 容器
  var svg = SVG( containerDom ).size( _Coordinate.width, _Coordinate.height )

  // 绘制框架
  _Frame.createFrame( 0, 0, '100%', '100%' ).draw( svg, 12, {
    stroke: '#000000',
    fill: '#F0FFFF',
  } )

  // // 绘制列表
  // _List.createList( 0, 0, '100%', '100%' ).draw( svg, 12, {
  //   stroke: '#000000',
  //   fill: '#F0FFFF',
  // } )

  // // 绘制 cooking steps
  // _Step.createStep( 0, 0, '100%', '100%' ).draw( svg, 12, {
  //   stroke: '#000000',
  //   fill: '#F0FFFF',
  // } )

  // // 绘制 nutrition info
  // _Nutrition.createNutrition( 0, 0, '100%', '100%' ).draw( svg, 12, {
  //   stroke: '#000000',
  //   fill: '#F0FFFF',
  // } )
} )
