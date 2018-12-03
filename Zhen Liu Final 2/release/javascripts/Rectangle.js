/**
 * 绘制矩形
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Rectangle( x, y, width, height ) {
  Coordinate.call( this, x, y )

  this.width = width
  this.height = height
}

_Rectangle.createRectangle = function ( x, y, width, height ) {
  return new _Rectangle( x, y, width, height )
}

_Rectangle.prototype.draw = function ( svg, radius, attr ) {
  radius = radius ? radius : 0
  attr = attr ? attr : {}

  attr.x = attr.x ? attr.x : this.x
  attr.y = attr.y ? attr.y : this.y

  return svg.rect( this.width, this.height ).radius( radius ).attr( attr )
}
