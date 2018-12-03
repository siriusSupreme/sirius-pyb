/**
 * 绘制主体框架
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Frame( x, y, width, height ) {
  Coordinate.call( this, x, y )

  this.width = width
  this.height = height
}

_Frame.prototype.draw = function ( svg, radius, attr ) {
  // 主体框架
  _Rectangle.createRectangle( this.x, this.y, this.width, this.height ).draw( svg, radius, attr )

  // 标题区
  _Rectangle.createRectangle( 75, 80, 150, 80 ).draw( svg, 0, {
    fill: 'white',
    stroke: '#383838',
    'stroke-width': 2
  } )
  _Text.createText( 120, 120, 'T A S T E' ).draw( svg, {
    'font-family': 'Knewave'
  } )

  // 按钮区
  _Circle.createCircle( 345, 330, 50 ).draw( svg, {
    fill: 'white',
    stroke: '#383838',
    'stroke-width': 2
  } )
  _Text.createText( 120, 120, 'Start' ).draw( svg, {
    'font-family': 'Knewave'
  } )
}
