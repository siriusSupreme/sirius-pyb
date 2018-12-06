/**
 * 绘制圆形
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} radius
 */
function _Circle( x, y, radius ) {
  _Coordinate.call( this, x, y )

  this.radius = radius
  this.diameter = radius * 2
}

_Circle.createCircle = function ( x, y, radius ) {
  return new _Circle( x, y, radius )
}

_Circle.prototype.draw = function ( svg, attr ) {
  attr = attr ? attr : {}

  attr.cx = attr.cx ? attr.cx : this.x
  attr.cy = attr.cy ? attr.cy : this.y

  return svg.circle( this.diameter ).attr( attr )
}
