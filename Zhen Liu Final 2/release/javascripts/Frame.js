/**
 * 绘制主体框架
 * @param {Number|String} x
 * @param {Number|String} y
 * @param {Number|String} width
 * @param {Number|String} height
 */
function _Frame(x, y, width, height) {
    _Coordinate.call(this, x, y)

    this.width = width
    this.height = height
}

_Frame.createFrame = function(x, y, width, height) {
    return new _Frame(x, y, width, height)
}

_Frame.prototype.draw = function(svg, radius, attr, useSelect) {
    let self = this
    var searchDom = document.querySelector('#search')

    // 主体框架
    _Rectangle.createRectangle(this.x, this.y, this.width, this.height).draw(svg, radius, attr)

    // 标题区
    var titleRect = _Rectangle.createRectangle(75, 80, 150, 80).draw(svg, 0, {
        fill: 'white',
        stroke: '#383838',
        'stroke-width': 2
    })

    var titleText = _Text.createText(110, 105, 'T A S T E').draw(svg, {}, {
        style: 'font-family: Knewave;'
    }).font({
        size: 20,
        family: 'Knewave'
    })

    // 按钮区
    function searchHandler(e) {
        if (searchDom.classList.contains('shown')) {
            // 搜索逻辑
            value = searchDom.value

            // 有值，则进行搜索
            if (value) {
                searchDom.classList.remove('shown')

                if (value === 'Chinese cusine') _List.createList(self.x, self.y, self.width, self.height).draw(svg, radius, attr, true, useSelect)
                else _List.createList(self.x, self.y, self.width, self.height).draw(svg, radius, attr, false, useSelect)
            }
        } else {
            // 隐藏标题
            titleRect.addClass('hidden')
            titleText.addClass('hidden')
                // 显示搜索框
            searchDom.classList.add('shown')
            searchDom.focus()
        }
    }

    _Circle.createCircle(150, 330, 50).draw(svg, {
        fill: 'white',
        stroke: '#383838',
        'stroke-width': 2,
        style: 'cursor: pointer;'
    }).on('click', searchHandler)

    _Text.createText(127, 312, 'Start').draw(svg, {
        style: 'cursor: pointer;'
    }, {
        style: 'font-family: Knewave;'
    }).font({
        size: 20,
        family: 'Knewave'
    }).on('click', searchHandler)
}