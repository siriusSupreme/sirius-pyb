/**
 * 绘制文本
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {String} text
 */
function _Plain( x, y, text ) {
  _Coordinate.call( this, x, y )

  this.text = text
}

_Plain.createPlain = function ( x, y, text ) {
  return new _Plain( x, y, text )
}

_Plain.prototype.draw = function ( svg, attr ) {
  attr = attr ? attr : {}

  attr.x = attr.x ? attr.x : this.x
  attr.y = attr.y ? attr.y : this.y

  return svg.plain( this.text ).attr( attr )
}
