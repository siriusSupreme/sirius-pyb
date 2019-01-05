layui.use(['form', 'laytpl'], function(form, laytpl) {
    // Mock 数据，生产环境可删除
    // { "swid": "00:00:00:00:00:00:00:04", "spid": [2, 1] }
    Mock.mock(/semSDN\/linkList/, {
        errorCode: 0,
        message: '@ctitle',
        data: '@range(1, 100, 8)',
    })

    // { "latency": 63.0, "dropRate": 0.0, "time": "2019-01-03 20:33:37", "bandwidthUtil": 0.0 }
    Mock.mock(/semSDN\/link-performance/, {
            errorCode: 0,
            message: '@ctitle',
            data: {
                latency: '@float(100, 10000, 2, 2)',
                dropRate: '@float(100, 10000, 2, 2)',
                bandwidthUtil: '@float(100, 10000, 2, 2)',
                time: function() {
                    return moment().format('YYYY-MM-DD HH:mm:ss')
                },
            }
        })
        // Mock 数据，生产环境可删除 end

    var timerId = 0

    var topLeftEchartsInstance = echarts.init(customEchartsTopLeft)
    var topRightEchartsInstance = echarts.init(customEchartsTopRight)
    var bottomLeftEchartsInstance = echarts.init(customEchartsBottomLeft)

    var echartsInstance = [topLeftEchartsInstance, topRightEchartsInstance, bottomLeftEchartsInstance]
    var title = ['链路延时', '链路利用率', '链路丢包率']
    var xAxisName = ['单位：t/s', '单位：t/s', '单位：t/s']
    var yAxisName = ['单位：ms', '单位：100%', '单位：100%']
    var key = ['latency', 'bandwidthUtil', 'dropRate']
    var data = [
        [],
        [],
        []
    ]

    var options = {
        title: {
            text: '',
            textStyle: {},
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            enterable: true
        },
        xAxis: {
            type: 'time',
            name: '',
            splitNumber: 8,
            // maxInterval: 50000,
            axisLabel: {
                formatter: function(value, index) {
                    return moment(value).format('YYYY-MM-DD HH:mm:ss').replace(/\s/, '\n')
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#f3f3f3'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#f3f3f3'
                }
            }
        },
        series: [{
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
        }]
    }

    function startRequest(link) {
        $.ajax({
            url: 'semSDN/link-performance',
            type: 'GET',
            data: { link: link },
            dataType: 'json'
        }).done(function(result) {
            renderEcharts(result.data || {})
        }).always(function() {
            timerId = setTimeout(function() {
                startRequest()
            }, 1000)
        })
    }

    function startCron(link) {
        if (timerId) timerId = clearTimeout(timerId)

        data = _.map(data, function(item) {
            var momentInstance = moment()
            return _.map(new Array(24), function(item, index) {
                var datetime = momentInstance.subtract(index, 'seconds').format('YYYY-MM-DD HH:mm:ss')

                return {
                    name: datetime,
                    value: [datetime, 0]
                }
            }).reverse()
        })

        if (link) startRequest(link)
    }

    function renderEcharts(seriesData) {
        _.forEach(echartsInstance, function(instance, index) {
            data[index].shift()
            data[index].push({
                name: seriesData.time,
                value: [seriesData.time, seriesData[key[index]]]
            })

            options.title.text = title[index]
            options.xAxis.name = xAxisName[index]
            options.yAxis.name = yAxisName[index]
            options.series[0].data = data[index]

            instance.setOption(options)
        })
    }

    form.render('select', 'custom-link-performance-form')
    form.on('select(custom-link-performance-select-link)', function(data) {
        startCron(data.value)
    })

    $.ajax({
        url: 'semSDN/linkList',
        type: 'GET',
        dataType: 'json'
    }).done(function(result) {
        var data = result.data

        laytpl(customLinkPerformanceSelectLinkTemplate.innerHTML).render({
            options: data
        }, function(html) {
            customLinkPerformanceSelectLink.innerHTML = html
            form.render('select', 'custom-link-performance-form')

            startCron(data[0])
        })
    }).always(function() {

    })
})