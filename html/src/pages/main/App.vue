<template >
  <iframe-container>
    <div class="dsw-first-line">
      <dsw-panel class="dsw-total-case-count" style="width: 40vw; height: 50vh;">
        <div slot="panel-heading">
          <span>累计案件数</span>
        </div>
        <dsw-echarts :options="totalCaseOptions" style="width: 40vw; height: 50vh;"></dsw-echarts>
      </dsw-panel>

      <dsw-panel class="dsw-case-trendency" style="width: 40vw; height: 50vh;">
        <div slot="panel-heading">
          <span>案件趋势图</span>
        </div>
        <dsw-echarts :options="caseTrendenyOptions" style="width: 40vw; height: 50vh;"></dsw-echarts>
      </dsw-panel>
    </div>

    <div class="dsw-second-line">
      <dsw-panel class="dsw-various-case-distribution" style="width: 40vw; height: 50vh;">
        <div slot="panel-heading">
          <span>各类型案件分布</span>
        </div>
        <dsw-echarts :options="caseDistributionOptions" style="width: 40vw; height: 50vh;"></dsw-echarts>
      </dsw-panel>

      <dsw-panel class="dsw-sponsor-case-count" style="width: 40vw; height: 50vh;">
        <div slot="panel-heading">
          <span>民警主办案件数</span>
        </div>
        <dsw-table :tableData="tableData" :columns="columns"></dsw-table>
        <dsw-pagination slot="panel-footer"></dsw-pagination>
      </dsw-panel>
    </div>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswEcharts from 'components/function/echarts'
import DswTable from 'components/function/table'
import DswPagination from 'components/common/pagination'

export default {
  name: 'App',
  data () {
    return {
      totalCaseOptions: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          x: 'rigth',
          bottom: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      },
      caseTrendenyOptions: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      caseDistributionOptions: {
        title: {
          text: 'ECharts2 vs ECharts1',
          subtext: 'Chrome下测试数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            'ECharts1 - 2k数据', 'ECharts1 - 2w数据', 'ECharts1 - 20w数据', '',
            'ECharts2 - 2k数据', 'ECharts2 - 2w数据', 'ECharts2 - 20w数据'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        grid: {y: 70, y2: 30, x2: 20},
        xAxis: [
          {
            type: 'category',
            data: ['Line', 'Bar', 'Scatter', 'K', 'Map']
          },
          {
            type: 'category',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitArea: {show: false},
            splitLine: {show: false},
            data: ['Line', 'Bar', 'Scatter', 'K', 'Map']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {formatter: '{value} ms'}
          }
        ],
        series: [
          {
            name: 'ECharts2 - 2k数据',
            type: 'bar',
            itemStyle: { normal: { color: 'rgba(193,35,43,1)', label: {show: true} } },
            data: [40, 155, 95, 75, 0]
          },
          {
            name: 'ECharts2 - 2w数据',
            type: 'bar',
            itemStyle: { normal: { color: 'rgba(181,195,52,1)', label: { show: true, textStyle: {color: '#27727B'} } } },
            data: [100, 200, 105, 100, 156]
          },
          {
            name: 'ECharts2 - 20w数据',
            type: 'bar',
            itemStyle: { normal: { color: 'rgba(252,206,16,1)', label: { show: true, textStyle: {color: '#E87C25'} } } },
            data: [906, 911, 908, 778, 0]
          },
          {
            name: 'ECharts1 - 2k数据',
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: { normal: { color: 'rgba(193,35,43,0.5)', label: { show: true, formatter: function (p) { return p.value > 0 ? (p.value + '\n') : '' } } } },
            data: [96, 224, 164, 124, 0]
          },
          {
            name: 'ECharts1 - 2w数据',
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: { normal: { color: 'rgba(181,195,52,0.5)', label: {show: true} } },
            data: [491, 2035, 389, 955, 347]
          },
          {
            name: 'ECharts1 - 20w数据',
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: { normal: { color: 'rgba(252,206,16,0.5)', label: { show: true, formatter: function (p) { return p.value > 0 ? (p.value + '+') : '' } } } },
            data: [3000, 3000, 2817, 3000, 0]
          }
        ]
      },
      tableData: [],
      columns: []
    }
  },
  components: {
    IframeContainer,
    DswPanel,
    DswEcharts,
    DswTable,
    DswPagination
  },
  mounted () {

  }
}
</script >

<style lang="stylus" >
.dsw-first-line{
  overflow: hidden;
  .dsw-total-case-count{
    float: left;
  }
  .dsw-case-trendency{
    float: right;
  }
}
.dsw-second-line{
  overflow: hidden;
  .dsw-various-case-distribution{
    float: left;
  }
  .dsw-sponsor-case-count{
    float: right;
  }
}
</style >

<style lang="stylus" scoped >

</style >
