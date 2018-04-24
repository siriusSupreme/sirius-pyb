<template>
  <div :id="id" class="dsw-echarts-wrapper"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/pie'

export default {
  name: 'Echarts',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      id: 'echarts-' + Math.random(),
      echartsInstance: null
    }
  },
  mounted () {
    if (this.echartsInstance === null) {
      this.echartsInstance = echarts.init(document.getElementById(this.id))
      this.echartsInstance.setOption(this.options)
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
