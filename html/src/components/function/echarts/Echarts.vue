<template>
    <div :id="id" :style="style"></div>
</template>

<script>
import echarts from 'echarts/src/echarts'

export default {
  name: "Echarts",
  props: {
    style: {
      type: Object,
      default: {
        width: '100%',
        height: '100%'
      }
    },
  },
  data () {
    return {
      id: 'echarts-' + Math.random(),
      echartsInstance: null
    }
  },
  mounted () {
    if ( this.echartsInstance === null ){
      this.echartsInstance = echarts.init(document.getElementById(this.id))
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
