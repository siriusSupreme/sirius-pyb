<template >
  <iframe-container :isShowFooter="true">
    <div class="dsw-first-line">
      <dsw-panel class="dsw-main-panel dsw-first-line-left">
        <template slot="panel-heading">
          <span class="dsw-panel-title">累计案件数</span>
        </template>
        <dsw-echarts :options="totalCaseOptions"></dsw-echarts>
      </dsw-panel>

      <dsw-panel class="dsw-main-panel dsw-first-line-right">
        <template slot="panel-heading">
          <span class="dsw-panel-title">案件趋势图</span>
        </template>
        <dsw-echarts :options="caseTrendenyOptions"></dsw-echarts>
      </dsw-panel>
    </div>

    <div class="dsw-second-line">
      <dsw-panel class="dsw-main-panel dsw-second-line-left">
        <template slot="panel-heading">
          <span class="dsw-panel-title">各类型案件分布</span>
        </template>
        <dsw-echarts :options="caseDistributionOptions"></dsw-echarts>
      </dsw-panel>

      <dsw-panel class="dsw-main-panel dsw-second-line-right">
        <template slot="panel-heading">
          <span class="dsw-panel-title">民警主办案件数</span>
        </template>
        <dsw-table :tableData="tableData" :columns="columns" :columnWidthDrag="true"></dsw-table>
      </dsw-panel>
    </div>
  </iframe-container>
</template >

<script >
import IframeContainer from 'components/common/iframe-container'
import DswPanel from 'components/common/panel'
import DswEcharts from 'components/common/echarts'
import DswTable from 'components/common/table'
import DswPagination from 'components/common/pagination'

export default {
  name: 'App',
  data () {
    return {
      totalCaseOptions: {
        title: {
          show: true,
          text: '案件总数：200',
          textStyle: {
            color: '#23c7ed'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 50,
          right: 30,
          textStyle: {
            color: '#fff'
          },
          data: ['在办', '已结', '未破']
        },
        calculable: true,
        series: [
          {
            name: '案卷数据',
            type: 'pie',
            center: ['45%', '50%'],
            label: {
              show: true,
              formatter: '{d}%\n\n{c}起',
              position: 'inside',
              fontSize: 14
            },
            data: [
              {value: 335, name: '在办', itemStyle: {color: '#1734c4'}},
              {value: 310, name: '已结', itemStyle: {color: '#13d734'}},
              {value: 234, name: '未破', itemStyle: {color: '#db4300'}}
            ]
          }
        ]
      },
      caseTrendenyOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          right: 10,
          top: 10,
          textStyle: {
            color: '#fff'
          },
          data: ['全部', '在办', '已结', '未破']
        },
        calculable: true,
        xAxis: {
          type: 'category',
          data: ['2018-04-26', '2018-04-27', '2018-04-28', '2018-04-29', '2018-04-30', '2018-05-01', '2018-05-02', '2018-05-03', '2018-05-04', '2018-05-05', '2018-05-06', '2018-05-07', '2018-05-08', '2018-05-09', '2018-05-10', '2018-05-11', '2018-05-12', '2018-05-13', '2018-05-14', '2018-05-15'],
          axisLabel: {
            color: '#23c7ed',
            fontSize: 14
          },
          axisTick: {
            inside: true
          },
          axisLine: {
            lineStyle: {
              color: '#23c7ed',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#23c7ed',
            fontSize: 14
          },
          axisLine: {
            lineStyle: {
              color: '#23c7ed',
              width: 2
            }
          },
          splitLine: {
            lineStyle: {
              color: '#333',
              type: 'dotted'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            startValue: 0
          },
          {
            type: 'slider',
            startValue: 0,
            backgroundColor: '#061838',
            borderColor: '#061838',
            dataBackground: {
              lineStyle: {
                color: '#23c7ed'
              },
              areaStyle: {
                color: '#23c7ed'
              }
            },
            textStyle: {
              color: '#23c7ed'
            }
          }
        ],
        series: [
          {
            name: '全部',
            type: 'line',
            stack: '总量',
            symbol: 'rect',
            itemStyle: {
              color: '#23c7ed'
            },
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
          },
          {
            name: '在办',
            type: 'line',
            stack: '总量',
            symbol: 'rect',
            itemStyle: {
              color: '#1734c4'
            },
            data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
          },
          {
            name: '已结',
            type: 'line',
            stack: '总量',
            symbol: 'rect',
            itemStyle: {
              color: '#13d734'
            },
            data: [150, 232, 201, 154, 190, 330, 410, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
          },
          {
            name: '未破',
            type: 'line',
            stack: '总量',
            symbol: 'rect',
            itemStyle: {
              color: '#db4300'
            },
            data: [320, 332, 301, 334, 390, 330, 320, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
          }
        ]
      },
      caseDistributionOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          left: 'center',
          bottom: 20,
          textStyle: {
            color: '#fff'
          },
          data: ['在办', '已结', '未破']
        },
        grid: {
          top: 10,
          bottom: 120
        },
        xAxis: {
          type: 'category',
          data: ['行政案件', '现场条件案件', '当场处理案件', '消防管理案件', '出入境管理案件', '交通管理案件', '行政复议案件', '涉赌行政案件', '刑事案件', '经济犯罪案件', '刑事复议案件', '赔偿案件', '诉讼案件', '少数案件', '其他'],
          axisLabel: {
            interval: 0,
            rotate: 45,
            color: '#23c7ed',
            fontSize: 14
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#23c7ed',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#23c7ed',
            fontSize: 14
          },
          axisLine: {
            lineStyle: {
              color: '#23c7ed',
              width: 2
            }
          },
          splitLine: {
            lineStyle: {
              color: '#333',
              type: 'dotted'
            }
          }
        },
        series: [
          {
            name: '在办',
            type: 'bar',
            stack: '总数',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            itemStyle: {
              color: '#1734c4'
            },
            data: [320, 302, 301, 334, 390, 330, 320, 320, 302, 301, 334, 390, 330, 320, 320]
          },
          {
            name: '已结',
            type: 'bar',
            stack: '总数',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            itemStyle: {
              color: '#13d734'
            },
            data: [120, 132, 101, 134, 90, 230, 210, 320, 302, 301, 334, 390, 330, 320, 320]
          },
          {
            name: '未破',
            type: 'bar',
            stack: '总数',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            itemStyle: {
              color: '#db4300'
            },
            data: [220, 182, 191, 234, 290, 330, 310, 320, 302, 301, 334, 390, 330, 320, 320]
          }
        ]
      },
      tableData: [],
      columns: [
        {
          title: '序号',
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return pagingIndex + rowIndex + 1
          },
          width: 30,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          overflowTitle: true
        },
        {title: '主办民警', field: 'ip', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '案件总数', field: 'content', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '在办案件数', field: 'updateTime', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '结案案件数', field: 'updateTime', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true},
        {title: '未破案件数', field: 'updateTime', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true}
      ]
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
  height : 45%;
  overflow: hidden;
  margin :0 0.10rem;
}
.dsw-second-line{
  height : 55%;
  overflow: hidden;
  margin :0 0.10rem;
}
.dsw-main-panel{
  background : url("./images/panel-bg.png") no-repeat scroll center center/99% 98%;
  .dsw-panel-heading{
    background : url("./images/panel-heading.png") no-repeat scroll 0 0/100% 100%;
    .dsw-panel-title{
      font-size :0.24rem;
    }
  }

  &.dsw-first-line-left,
  &.dsw-second-line-left{
    height : 100%;
    float : left;
  }
  &.dsw-first-line-right
  &.dsw-second-line-right{
    height :100%;
    float : right;
  }
  &.dsw-first-line-left,
  &.dsw-second-line-right{
    width :40%;
  }
  &.dsw-first-line-right,
  &.dsw-second-line-left{
    width :60%;
  }
}
</style >

<style lang="stylus" scoped >

</style >
