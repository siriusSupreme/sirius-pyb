var chineseSteps = '1、Place chicken pieces in a large bowl;\n2、Place chicken pieces in a large bowl;\n3、Place chicken pieces in a large bowl;\n4、Place chicken pieces in a large bowl;\n5、Place chicken pieces in a large bowl;'

var japaneseSteps = '1、Cooking steps\' content;\n2、Cooking steps\' content,Cooking\n steps\' content;\n3、Cooking steps\' content;\n4、Cooking steps\' content;\n5、Cooking steps\' content;'

/**
 * 绘制烹饪步骤
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Step( x, y, width, height ) {
  _Coordinate.call( this, x, y )

  this.width = width
  this.height = height
}

_Step.createStep = function ( x, y, width, height ) {
  return new _Step( x, y, width, height )
}

_Step.prototype.draw = function ( svg, radius, attr, isChina ) {
  var title = 'Cooking steps'
  var titleX = 68
  var steps = japaneseSteps

  if ( isChina ) {
    title = 'Cooking steps'
    titleX = 68
    steps = chineseSteps
  }

  // 主体框架
  _Rectangle.createRectangle( this.x, this.y, this.width, this.height ).draw( svg, radius, attr )

  // 标题区
  _Plain.createPlain( titleX, 12, title ).draw( svg, {}, {
    style: 'font-family: Knewave;'
  } ).font( {
    size: 24,
    family: 'Knewave'
  } )

  _Line.createLine( 10, 60, _Coordinate.width - 10, 60 ).draw( svg, {
    'stroke-width': 2
  } )

  // 烹饪步骤
  var startY = 72
  steps = Array.isArray( steps ) ? steps : steps.split( '\n' )

  steps.forEach( function ( step, index ) {
    _Text.createText( 10, startY, step ).draw( svg )

    startY += 24
  } )

}
