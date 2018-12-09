var chineseMenus = [{
    description: 'Orange Chicken',
    thumb: 'images/delish-sticky-orange-chicken.jpg'
}, {
    description: 'Orange Chicken',
    thumb: 'images/delish-sticky-orange-chicken.jpg'
}]

var japaneseMenus = [{
    description: 'cusine\'s name',
    thumb: 'images/picwdbAiG.jpg'
}, {
    description: 'cusine\'s name',
    thumb: 'images/picwdbAiG.jpg'
}]

/**
 * 绘制列表
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _List(x, y, width, height) {
    _Coordinate.call(this, x, y)

    this.width = width
    this.height = height
}

_List.createList = function(x, y, width, height) {
    return new _List(x, y, width, height)
}

_List.prototype.draw = function(svg, radius, attr, isChina, useSelect) {
    var self = this
    var title = 'Japanese cusine menu'
    var titleX = 44
    var menus = japaneseMenus

    var selectDom = null

    if (useSelect) selectDom = createSelect('select')

    if (isChina) {
        title = 'Chinese cusine menu'
        titleX = 48
        menus = chineseMenus
    }

    // 主体框架
    _Rectangle.createRectangle(this.x, this.y, this.width, this.height).draw(svg, radius, attr)

    // 标题区
    _Text.createText(titleX, 12, title).draw(svg, {}, {
        style: 'font-family: Knewave;'
    }).font({
        size: 24,
        family: 'Knewave'
    })

    _Line.createLine(10, 60, _Coordinate.width - 10, 60).draw(svg, {
        'stroke-width': 2
    })

    // 列表区
    var startY = 72
    menus.forEach(function(menu, index) {

        _Text.createText(10, startY, menu.description).draw(svg)

        _Image.createImage(_Coordinate.width - 130, startY, menu.thumb, 120, 90).draw(svg)

        _Rectangle.createRectangle(10, startY, _Coordinate.width - 20, 90).draw(svg, 0, {
            fill: 'transparent',
            style: 'cursor: pointer;'
        }).click(clickHandler)

        startY += 100

        _Line.createLine(10, startY, _Coordinate.width - 10, startY).draw(svg, {
            'stroke-width': 2
        })

        startY += 12
    })

    function clickHandler(e) {
        if (useSelect && selectDom) {
            var value = selectDom.value

            selectDom.classList.add('hidden')

            if (value === 'cooking steps') _Step.createStep(self.x, self.y, self.width, self.height).draw(svg, radius, attr, isChina)
            else if (value === 'nutrition info') _Nutrition.createNutrition(self.x, self.y, self.width, self.height).draw(svg, radius, attr, isChina)
        } else {
            _Detail.createDetail(self.x, self.y, self.width, self.height).draw(svg, radius, attr, isChina)
        }

    }
}