/**
 * 绘制文本
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {String} text
 */
function _Text( x, y, text ) {
  Coordinate.call( this, x, y )

  this.text = text
}

_Text.createText = function ( x, y, text ) {
  return new _Text( x, y, text )
}

_Text.prototype.draw = function ( svg, attr ) {
  attr = attr ? attr : {}

  attr.x = attr.x ? attr.x : this.x
  attr.y = attr.y ? attr.y : this.y

  return svg.text( this.text ).attr( attr )
}
