/**
 * 绘制图片
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {String} path
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Image( x, y, path, width, height ) {
  _Coordinate.call( this, x, y )

  this.path = path
  this.width = width
  this.height = height
}

_Image.createImage = function ( x, y, path, width, height ) {
  return new _Image( x, y, path, width, height )
}

_Image.prototype.draw = function ( svg, attr ) {
  attr = attr ? attr : {}

  return svg.image( this.path ).size( this.width, this.height ).move( this.x, this.y ).attr( attr )
}
