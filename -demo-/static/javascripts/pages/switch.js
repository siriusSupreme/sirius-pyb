layui.use('table', function() {
    // Mock 数据，生产环境可删除
    // {
    //   "switchId": "00:00:00:00:00:00:00:04",
    //   "ip": "/192.168.50.246:47214",
    //   "openFlowVersion": "OF_13",
    //   "connectedSince": 1545038042595
    // }
    var result = null

    Mock.mock(/semSDN\/switch/, function(options) {
            var params = _.chain(options.url.split('?')[1]).split('&').map(_.ary(_.partial(_.split, _, '='), 1)).fromPairs().value()
            var page = +params.page || 1
            var limit = +params.limit || 20
            var endRecord = limit * page

            if (!result) {
                result = Mock.mock({
                    'lists|100-1200': [{
                        'id|+1': 1,
                        ip: '@ip',
                        switchId: /\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}/,
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    }],
                    total: function() {
                        return this.lists.length
                    },
                    pages: function() {
                        return Math.ceil(this.total / this.limit)
                    },
                    page: 1,
                    limit: 20
                })
            }

            return Mock.mock({
                errorCode: 0,
                message: '@ctitle',
                data: {
                    lists: result.lists.slice(endRecord - limit, endRecord),
                    total: result.total,
                    pages: result.pages,
                    page: page,
                    limit: limit
                }
            })
        })
        // Mock 数据，生产环境可删除 end

    var table = layui.table

    // 第一个实例
    table.render({
        elem: '#custom-switch-table',
        height: 'full-50',
        loading: true,
        even: true,
        url: 'semSDN/switch',
        method: 'GET',
        parseData: function(result) {
            return {
                code: result.errorCode,
                msg: result.message,
                count: result.data.total,
                data: result.data.lists
            }
        },
        request: {
            pageName: 'page',
            limitName: 'limit'
        },
        page: true, // 开启分页
        limit: 20,
        cols: [
            [ // 表头
                {
                    title: 'switch',
                    field: 'switchId',
                    minWidth: 120,
                    align: 'center'
                }, {
                    title: 'IP address',
                    field: 'ip',
                    minWidth: 120,
                    align: 'center'
                }, {
                    title: 'openFlow Version',
                    field: 'openFlowVersion',
                    minWidth: 120,
                    align: 'center'
                }, {
                    title: 'connect time',
                    field: 'connectedSince',
                    templet: function(d) {
                        return moment(d.connectedSince).format('YYYY-MM-DD HH:mm:ss')
                    },
                    minWidth: 240,
                    align: 'center'
                }
            ]
        ]
    })
})