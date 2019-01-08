$(function() {

    // Mock 数据，生产环境可删除
    Mock.mock(/semSDN\/network-topology/, {
            errorCode: 0,
            message: '@ctitle',
            data: {
                hosts: [{
                        ip: '10.0.0.1',
                        mac: 'ea:53:a0:f0:ea:4b',
                        sId: '00:00:00:00:00:00:00:01',
                        spId: 4,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.2',
                        mac: '8e:d7:0d:2f:bd:1b',
                        sId: '00:00:00:00:00:00:00:01',
                        spId: 5,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.3',
                        mac: 'f2:f3:9c:aa:43:39',
                        sId: '00:00:00:00:00:00:00:01',
                        spId: 6,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.4',
                        mac: '4e:e0:40:00:f0:20',
                        sId: '00:00:00:00:00:00:00:02',
                        spId: 2,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.5',
                        mac: '72:7f:3e:ff:99:23',
                        sId: '00:00:00:00:00:00:00:02',
                        spId: 3,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.6',
                        mac: 'b2:37:71:6e:3e:1c',
                        sId: '00:00:00:00:00:00:00:04',
                        spId: 4,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.7',
                        mac: '5e:88:92:37:4e:52',
                        sId: '00:00:00:00:00:00:00:05',
                        spId: 4,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.8',
                        mac: 'ba:52:60:da:40:0d',
                        sId: '00:00:00:00:00:00:00:03',
                        spId: 1,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.9',
                        mac: '96:ba:71:a9:a5:ff',
                        sId: '00:00:00:00:00:00:00:06',
                        spId: 3,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.10',
                        mac: '9e:b4:aa:7f:b7:b6',
                        sId: '00:00:00:00:00:00:00:08',
                        spId: 4,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.11',
                        mac: '12:5b:62:58:07:93',
                        sId: '00:00:00:00:00:00:00:08',
                        spId: 5,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.12',
                        mac: 'a2:f1:82:3c:89:21',
                        sId: '00:00:00:00:00:00:00:08',
                        spId: 6,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.13',
                        mac: '02:fe:46:e6:47:c1',
                        sId: '00:00:00:00:00:00:00:09',
                        spId: 2,
                        lastSeen: '@datetime'
                    },
                    {
                        ip: '10.0.0.14',
                        mac: '2e:27:8b:91:dc:d0',
                        sId: '00:00:00:00:00:00:00:09',
                        spId: 1,
                        lastSeen: '@datetime'
                    }
                ],
                switches: [{
                        switchId: '00:00:00:00:00:00:00:01',
                        ip: '192.168.50.113:54613',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:02',
                        ip: '192.168.50.113:54611',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:03',
                        ip: '192.168.50.113:54615',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:04',
                        ip: '192.168.50.113:54616',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:05',
                        ip: '192.168.50.113:54610',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:06',
                        ip: '192.168.50.113:54618',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:07',
                        ip: '192.168.50.113:54617',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:08',
                        ip: '192.168.50.113:54612',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    },
                    {
                        switchId: '00:00:00:00:00:00:00:09',
                        ip: '192.168.50.113:54614',
                        openFlowVersion: '@string("upper", 2)_@string("number", 2)',
                        connectedSince: '@datetime'
                    }
                ],
                links: [{
                        src_sid: '00:00:00:00:00:00:00:04',
                        src_pid: 2,
                        dst_sid: '00:00:00:00:00:00:00:05',
                        dst_pid: 1
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:03',
                        src_pid: 3,
                        dst_sid: '00:00:00:00:00:00:00:05',
                        dst_pid: 2
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:07',
                        src_pid: 4,
                        dst_sid: '00:00:00:00:00:00:00:08',
                        dst_pid: 3
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:04',
                        src_pid: 3,
                        dst_sid: '00:00:00:00:00:00:00:07',
                        dst_pid: 2
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:06',
                        src_pid: 1,
                        dst_sid: '00:00:00:00:00:00:00:08',
                        dst_pid: 2
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:01',
                        src_pid: 3,
                        dst_sid: '00:00:00:00:00:00:00:02',
                        dst_pid: 1
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:07',
                        src_pid: 3,
                        dst_sid: '00:00:00:00:00:00:00:09',
                        dst_pid: 3
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:01',
                        src_pid: 1,
                        dst_sid: '00:00:00:00:00:00:00:04',
                        dst_pid: 1
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:01',
                        src_pid: 2,
                        dst_sid: '00:00:00:00:00:00:00:03',
                        dst_pid: 2
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:05',
                        src_pid: 3,
                        dst_sid: '00:00:00:00:00:00:00:07',
                        dst_pid: 1
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:08',
                        src_pid: 1,
                        dst_sid: '00:00:00:00:00:00:00:09',
                        dst_pid: 4
                    },
                    {
                        src_sid: '00:00:00:00:00:00:00:03',
                        src_pid: 4,
                        dst_sid: '00:00:00:00:00:00:00:06',
                        dst_pid: 2
                    }
                ]
            }
        })
        // Mock 数据，生产环境可删除 end

    var echartsInstance = echarts.init(document.getElementById('customNetworkTopologyEcharts'))

    var data = []
    var links = []
    var href = location.href.replace(/[^\/]*\.html?$/, '')
    href = href.slice(-1) === '/' ? href : (href + '/')

    var hostSymbol = 'image://' + href + 'static/images/network-topology/host.png'
    var switchSymbol = 'image://' + href + 'static/images/network-topology/switch.png'

    var options = {
        title: {
            text: '链路拓扑图',
            textStyle: {},
            left: 'center'
        },
        tooltip: {
            backgroundColor: '#98eae9',
            textStyle: {
                color: '#333',
                fontSize: 16,
                lineHeight: 32
            },
            extraCssText: 'white-space: pre-line;'
        },
        grid: {},
        series: [{
            type: 'graph',
            hoverAnimation: true,
            layout: 'force',
            force: {
                initLayout: 'force',
                repulsion: 1500
            },
            roam: true,
            nodeScaleRatio: 0.8,
            draggable: true,
            focusNodeAdjacency: true,
            symbolSize: 48,
            // edgeSymbol: ['circle', 'arrow'],
            lineStyle: {
                width: 2,
                color: '#23e45c',
                opacity: 0.8,
                curveness: 0.5
            },
            label: {
                show: true,
                position: 'bottom'
            },
            edgeLabel: {
                show: false
            },
            categories: [{
                name: 'host',
                symbol: hostSymbol
            }, {
                name: 'switch',
                symbol: switchSymbol
            }],
            data: data,
            links: links
        }]
    }

    echartsInstance.setOption(options)

    $.ajax({
        url: 'semSDN/network-topology',
        type: 'GET',
        dataType: 'json'
    }).done(function(result) {
        var data = []
        var linksData = []

        var hosts = _.get(result, 'data.hosts', [])
        var switches = _.get(result, 'data.switches', [])
        var links = _.get(result, 'data.links', [])

        _.forEach(hosts, function(item, index) {
            data.push({
                name: item.ip,
                // value: 0,
                category: 0,
                symbol: hostSymbol,
                label: {
                    formatter: function(params) {
                        var data = params.data

                        return data.aliasName
                    }
                },
                tooltip: {
                    formatter: function(params, ticket, callback) {
                        var data = params.data

                        return data.source ? data.source + ' ==> ' + data.target : 'Type：host<br/>' + 'IP：' + data.name + '<br/>' + 'MAC：' + data.mac + '<br/>' + 'switchID：' + data.sId + '<br/>' + 'switchPort：' + data.spId + '<br/>' + 'connectDuration：' + data.datetime
                    }
                },
                type: 'host',
                aliasName: 'host_' + (index + 1),
                mac: item.mac,
                sId: item.sId,
                spId: item.spId,
                datetime: moment(item.lastSeen).format('YYYY-MM-DD HH:mm:ss')
            })

            linksData.push({
                source: item.sId,
                target: item.ip,
                // value: 0,
                label: {

                },
                lineStyle: {
                    color: '#23e45c',
                }
            })
        })

        _.forEach(switches, function(item, index) {
            data.push({
                name: item.switchId,
                // value: 0,
                category: 1,
                symbol: switchSymbol,
                label: {
                    formatter: function(params) {
                        var data = params.data

                        return data.aliasName
                    }
                },
                tooltip: {
                    formatter: function(params, ticket, callback) {
                        var data = params.data

                        return data.source ? data.source + ' ==> ' + data.target : 'Type：switch<br/>' + 'IP：' + data.ip + '<br/>' + 'switchID：' + data.name + '<br/>' + 'openFlowVersion：' + data.openFlowVersion + '<br/>' + 'connectDuration：' + data.datetime
                    }
                },
                type: 'switch',
                aliasName: 'switch_' + (index + 1),
                ip: item.ip,
                openFlowVersion: item.openFlowVersion,
                spId: item.spId,
                datetime: moment(item.connectedSince).format('YYYY-MM-DD HH:mm:ss')
            })
        })

        _.forEach(links, function(item, index) {
            linksData.push({
                source: item.src_sid,
                target: item.dst_sid,
                // value: 0,
                label: {

                },
                lineStyle: {
                    color: '#2b2bec',
                }
            })
        })

        options.series[0].data = data
        options.series[0].links = linksData

        echartsInstance.setOption(options)
    }).always(function() {

    })
})