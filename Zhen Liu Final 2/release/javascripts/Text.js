/**
 * 绘制文本
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {String} text
 */
function _Text( x, y, text ) {
  _Coordinate.call( this, x, y )

  this.text = text
}

_Text.createText = function ( x, y, text ) {
  return new _Text( x, y, text )
}

_Text.prototype.draw = function ( svg, attr, tspanAttr ) {
  attr = attr ? attr : {}
  tspanAttr = tspanAttr ? tspanAttr : {}

  attr.x = attr.x ? attr.x : this.x
  attr.y = attr.y ? attr.y : this.y

  let text = svg.text( this.text ).attr( attr )

  SVG.select( 'tspan' ).attr( tspanAttr )

  return text
}
