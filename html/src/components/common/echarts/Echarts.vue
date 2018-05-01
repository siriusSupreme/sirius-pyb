<template>
  <div :id="id" class="dsw-echarts-wrapper" :ref="'dsw-echarts-wrapper-'+id"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'

import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'

export default {
  name: 'Echarts',
  props: {
    options: {
      type: Object,
      default () {
        return {
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
        }
      }
    }
  },
  data () {
    return {
      id: 'echarts-' + Math.random(),
      echartsInstance: null
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler (val, oldVal) {
        if (this.echartsInstance) {
          if (val) {
            this.echartsInstance.setOption(val)
          } else {
            this.echartsInstance.setOption(oldVal)
          }
        } else {
          this.initializeEcharts()
        }
      }
    }
  },
  methods: {
    initializeEcharts () {
      this.$nextTick(() => {
        this.echartsInstance = echarts.init(this.$refs['dsw-echarts-wrapper-' + this.id])
        this.echartsInstance.setOption(this.options)
      })

      window.addEventListener('resize', (e) => {
        this.echartsInstance.resize()
      })
    }
  }
}
</script>

<style lang="stylus">
.dsw-echarts-wrapper{
    width :100%;
    height : 100%;
}
</style>

<style lang="stylus" scoped>

</style>
