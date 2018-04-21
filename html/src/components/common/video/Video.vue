<template>
  <video :src="src" :width="width" :height="height" loop autoplay>
    <object classid="clsid:F08DF954-8592-11D1-B16A-00C0F0283628" :id="id" :width="width" :height="height">
      <param name="BorderStyle" value="1" />
      <param name="MousePointer" value="0" />
      <param name="Enabled" value="1" />
      <param name="Min" value="0" />
      <param name="Max" value="10" />
      <embed :src="src" :width="width" :height="height" type="" />
    </object>
  </video >
</template>

<script>
export default {
  name: 'DswVideo',
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    src: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      id: 'video-' + Math.random()
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
