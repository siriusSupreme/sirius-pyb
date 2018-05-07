<template>
  <button type="button" class="dsw-btn" v-if="isButton" @click.stop.prevent="buttonHandler">{{buttonText}}</button>
  <a href="javascript:void(0);" class="dsw-btn" v-else @click.stop.prevent="buttonHandler">{{buttonText}}</a >
</template>

<script>
export default {
  name: 'Button',
  props: {
    isButton: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: '按钮'
    }
  },
  methods: {
    buttonHandler (e) {
      this.$emit('dsw-btn-click', e)
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
.dsw-btn{
  display : inline-block;
  background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
}
</style>
