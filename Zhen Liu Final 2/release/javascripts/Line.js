/**
 * 绘制一条线
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} x0
 * @param {Number|String} y0
 */
function _Line( x, y, x0, y0 ) {
  _Coordinate.call( this, x, y )

  this.x0 = x0
  this.y0 = y0
}

_Line.createLine = function ( x, y, x0, y0 ) {
  return new _Line( x, y, x0, y0 )
}

_Line.prototype.draw = function ( svg, attr ) {
  attr = attr ? attr : {}

  return svg.line( this.x, this.y, this.x0, this.y0 ).attr( attr )
}
