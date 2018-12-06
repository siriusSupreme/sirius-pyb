/**
 * 绘制矩形
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Rectangle( x, y, width, height ) {
  _Coordinate.call( this, x, y )

  this.width = width
  this.height = height
}

_Rectangle.createRectangle = function ( x, y, width, height ) {
  return new _Rectangle( x, y, width, height )
}

_Rectangle.prototype.draw = function ( svg, radius, attr ) {
  radius = radius ? radius : 0
  attr = attr ? attr : {}

  return svg.rect( this.width, this.height ).move( this.x, this.y ).radius( radius ).attr( attr )
}
