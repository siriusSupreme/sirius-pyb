var chineseDetails = {
    'cooking steps: ': '1、Place chicken pieces in a large bowl;\n2、Place chicken pieces in a large bowl;\n3、Place chicken pieces in a large bowl;\n4、Place chicken pieces in a large bowl;\n5、Place chicken pieces in a large bowl;',
    'nutrition info: ': '1、Cusines\' nutrient content;\n2、Cusines\' nutrient content, Cooking \nsteps\' content;\n3、Cusines\' nutrient content;\n4、Cusines\' nutrient content;\n5、Cusines\' nutrient content;'
}

var japaneseDetails = {
    'cooking steps: ': '1、Cooking steps\' content;\n2、Cooking steps\' content,Cooking\n steps\' content;\n3、Cooking steps\' content;\n4、Cooking steps\' content;\n5、Cooking steps\' content;',
    'nutrition info: ': '1、Cusines\' nutrient content;\n2、Cusines\' nutrient content, Cooking \nsteps\' content;\n3、Cusines\' nutrient content;\n4、Cusines\' nutrient content;\n5、Cusines\' nutrient content;'
}

/**
 * 绘制烹饪详情
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Detail(x, y, width, height) {
    _Coordinate.call(this, x, y)

    this.width = width
    this.height = height
}

_Detail.createDetail = function(x, y, width, height) {
    return new _Detail(x, y, width, height)
}

_Detail.prototype.draw = function(svg, radius, attr, isChina) {
    var title = 'Cooking steps'
    var titleX = 68
    var details = japaneseDetails

    if (isChina) {
        title = 'Cooking steps'
        titleX = 68
        details = chineseDetails
    }

    // 主体框架
    _Rectangle.createRectangle(this.x, this.y, this.width, this.height).draw(svg, radius, attr)

    // 标题区
    _Plain.createPlain(titleX, 36, title).draw(svg, {}, {
        style: 'font-family: Knewave;'
    }).font({
        size: 24,
        family: 'Knewave'
    })

    _Line.createLine(10, 60, _Coordinate.width - 10, 60).draw(svg, {
        'stroke-width': 2
    })

    // 烹饪步骤
    var startY = 72

    Object.entries(details).forEach(function(detail) {
        _Text.createText(10, startY, detail[0]).draw(svg)

        detail[1].split('\n').forEach(function(text, index) {
            startY += 24
            _Text.createText(36, startY, text).draw(svg)
        })

        startY += 36
        _Line.createLine(10, startY, _Coordinate.width - 10, startY).draw(svg, {
            'stroke-width': 2
        })
        startY += 12
    })

}