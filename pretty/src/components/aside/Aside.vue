<template >
  <aside :style="styleCss"><slot></slot></aside>
</template >

<script >
export default {
  name: 'Aside',
  props: {
    width: {
      type: String,
      default: '200px'
    }
  },
  computed: {
    styleCss () {
      return {
        width: this.width
      }
    }
  }
}
</script >

<style lang="stylus" scoped >

</style >
