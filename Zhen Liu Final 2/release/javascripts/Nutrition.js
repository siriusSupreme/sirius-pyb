var chineseNutritions = '1、Cusines\' nutrient content;\n2、Cusines\' nutrient content, Cooking \nsteps\' content;\n3、Cusines\' nutrient content;\n4、Cusines\' nutrient content;\n5、Cusines\' nutrient content;'

var japaneseNutritions = '1、Cusines\' nutrient content;\n2、Cusines\' nutrient content, Cooking \nsteps\' content;\n3、Cusines\' nutrient content;\n4、Cusines\' nutrient content;\n5、Cusines\' nutrient content;'

/**
 * 绘制营养信息
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Nutrition( x, y, width, height ) {
  _Coordinate.call( this, x, y )

  this.width = width
  this.height = height
}

_Nutrition.createNutrition = function ( x, y, width, height ) {
  return new _Nutrition( x, y, width, height )
}

_Nutrition.prototype.draw = function ( svg, radius, attr, isChina ) {
  var title = 'Nutrition info'
  var titleX = 68
  var nutritions = japaneseNutritions

  if ( isChina ) {
    title = 'Nutrition info'
    titleX = 68
    nutritions = chineseNutritions
  }

  // 主体框架
  _Rectangle.createRectangle( this.x, this.y, this.width, this.height ).draw( svg, radius, attr )

  // 标题区
  _Text.createText( titleX, 12, title ).draw( svg, {}, {
    style: 'font-family: Knewave;'
  } ).font( {
    size: 24,
    family: 'Knewave'
  } )

  _Line.createLine( 10, 60, _Coordinate.width - 10, 60 ).draw( svg, {
    'stroke-width': 2
  } )

  // 营养信息
  var startY = 72
  nutritions = Array.isArray( nutritions ) ? nutritions : nutritions.split( '\n' )

  nutritions.forEach( function ( nutrition, index ) {
    _Text.createText( 10, startY, nutrition ).draw( svg )

    startY += 24
  } )

}
