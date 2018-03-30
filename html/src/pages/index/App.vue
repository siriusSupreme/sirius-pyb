<template >
  <div class="container" >
    <span @click="demo">demo</span>
    Hello World
  </div >
</template >

<script >
import toastr from 'toastr'

export default {
  name: 'App',
  data () {
    return {
      msg: 'hello word'
    }
  },
  mounted () {
    console.log(toastr)
  },
  methods: {
    demo (e) {
      console.log(e)
    }
  }
}
</script >

<style lang="stylus" >
  .container{
    background-color: red
  }
</style >

<style lang="stylus" scoped >
  .container{
    background-color: red
  }
</style >
