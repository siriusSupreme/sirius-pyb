layui.use('table', function () {
  // Mock 数据，生产环境可删除
  // {
  //   "src_sid": "00:00:00:00:00:00:00:03",
  //   "src_pid": 3,
  //   "dst_sid": "00:00:00:00:00:00:00:04",
  //   "dst_pid": 2,
  //   "type": "internal",
  //   "direction": "bidirectional",
  //   "latency": 324
  // }
  var result = null

  Mock.mock(/semSDN\/link/, function (options) {
    var params = _.chain(options.url.split('?')[ 1 ]).split('&').map(_.ary(_.partial(_.split, _, '='), 1)).fromPairs().value()
    var page = +params.page || 1
    var limit = +params.limit || 20
    var endRecord = limit * page

    if (!result) {
      result = Mock.mock({
        'lists|100-1200': [ {
          'id|+1': 1,
          src_sid: /\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}/,
          src_pid: '@integer(0, 239)',
          dst_sid: /\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}/,
          dst_pid: '@integer(0, 239)',
          type: 'internal',
          direction: 'bidirectional',
          latency: '@integer(0, 1000)'
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
    elem: '#custom-link-table',
    height: 'full-50',
    loading: true,
    url: 'semSDN/link',
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
          title: 'source switch',
          field: 'src_sid',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'source port',
          field: 'src_pid',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'destination switch',
          field: 'dst_sid',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'destination port',
          field: 'dst_pid',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'Type',
          field: 'type',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'Direction',
          field: 'direction',
          minWidth: 120,
          align: 'center'
        }, {
          title: 'Latency',
          field: 'latency',
          minWidth: 120,
          align: 'center'
        }
      ]
    ]
  })
})
