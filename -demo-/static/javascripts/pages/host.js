layui.use('table', function () {
  // Mock 数据，生产环境可删除
  // {
  //   "ip": "10.0.0.6",
  //   "mac": "e2:eb:15:1a:f3:71",
  //   "sId": "00:00:00:00:00:00:00:03",
  //   "spid": 6,
  //   "lastSeen": 1545038436002
  // }
  var result = null

  Mock.mock(/semSDN\/host/, function (options) {
    var params = _.chain(options.url.split('?')[ 1 ]).split('&').map(_.ary(_.partial(_.split, _, '='), 1)).fromPairs().value()
    var page = +params.page || 1
    var limit = +params.limit || 20
    var endRecord = limit * page

    if (!result) {
      result = Mock.mock({
        'lists|100-1200': [ {
          'id|+1': 1,
          ip: '@ip',
          mac: /[a-f\d]{2}:[a-f\d]{2}:[a-f\d]{2}:[a-f\d]{2}:[a-f\d]{2}:[a-f\d]{2}/,
          sId: /\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}/,
          spId: '@integer(0, 239)',
          lastSeen: '@datetime'
        } ],
        total: function () {
          return this.lists.length
        },
        pages: function () {
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
    elem: '#custom-host-table',
    height: 'full-50',
    loading: true,
    url: 'semSDN/host',
    method: 'GET',
    parseData: function (result) {
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
          title: 'IP address',
          field: 'ip',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'MAC address',
          field: 'mac',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'switch',
          field: 'sId',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'port',
          field: 'spId',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'connect time',
          field: 'lastSeen',
          templet: function (d) {
            return moment(d.lastSeen).format('YYYY-MM-DD HH:mm:ss')
          },
          minWidth: 240,
          align: 'center'
        }
      ]
    ]
  })
})
