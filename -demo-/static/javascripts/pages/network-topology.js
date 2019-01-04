$(function () {
  var echartsInstance = echarts.init(document.getElementById('customNetworkTopologyEcharts'))

  var data = []
  var links = []
  var href = location.href.replace(/[^\/]*\.html?$/, '')
  href = href.slice(-1) === '/' ? href : (href + '/')

  var hostSymbol = 'image://' + href + 'static/images/network-topology/host.png'
  var switchSymbol = 'image://' + href + 'static/images/network-topology/switch.png'

  // Mock 数据，生产环境可删除
  // {
  //   "ip": "10.0.0.6",
  //   "mac": "e2:eb:15:1a:f3:71",
  //   "sId": "00:00:00:00:00:00:00:03",
  //   "spid": 6,
  //   "lastSeen": 1545038436002
  // }

  // {
  //   "src_sid": "00:00:00:00:00:00:00:03",
  //   "src_pid": 3,
  //   "dst_sid": "00:00:00:00:00:00:00:04",
  //   "dst_pid": 2,
  //   "type": "internal",
  //   "direction": "bidirectional",
  //   "latency": 324
  // }

  Mock.mock(/semSDN\/network-topology/, {
    errorCode: 0,
    message: '@ctitle',
    'data|30-100': [ {
      // 'category|1': [ 0, 1 ],
      'category|1': [ 'host', 'switch' ],
      name: '@category @guid',
      symbol: function () {
        if (this.category === 'host' || this.category === 0) return hostSymbol
        else return switchSymbol
      },
      value: '@integer(120, 1200)',
      source: /\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}/,
      target: /\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}/
    } ]
  })
  // Mock 数据，生产环境可删除 end

  var options = {
    title: {
      text: 'Graph 简单示例',
      textStyle: {},
      left: 'center'
    },
    tooltip: {
      formatter: function (params, ticket, callback) {
        var data = params.data

        return data.name + data.value
      }
    },
    grid: {},
    series: [ {
      type: 'graph',
      hoverAnimation: true,
      layout: 'force',
      force: {
        initLayout: 'force',
        repulsion: 240
      },
      roam: true,
      nodeScaleRatio: 0.8,
      draggable: true,
      focusNodeAdjacency: true,
      symbolSize: 48,
      edgeSymbol: [ 'circle', 'arrow' ],
      label: {
        show: true,
        position: 'bottom',
        formatter: function (params) {
          var data = params.data

          return data.category
        }
      },
      lineStyle: {
        width: 2,
        color: 'red',
        opacity: 0.9,
        curveness: 0.3
      },
      categories: [ {
        name: 'host',
        symbol: hostSymbol
      }, {
        name: 'switch',
        symbol: switchSymbol
      } ],
      data: data,
      links: links
    } ]
  }

  // echartsInstance.setOption(options)

  $.ajax({
    url: 'semSDN/network-topology',
    type: 'GET',
    dataType: 'json'
  }).done(function (result) {
    var data = result.data

    options.series[ 0 ].data = data
    options.series[ 0 ].links = data

    echartsInstance.setOption(options)
  }).always(function () {

  })
})
