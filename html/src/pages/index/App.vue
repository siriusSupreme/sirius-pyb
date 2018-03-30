<template >
  <div class="container" >
    <span @click="demo">demo</span>
    Hello World
  </div >
</template >

<script >
import toastr from 'toastr'
const layer = require('assets/vendors/layer/layer')
// import layer from 'assets/vendors/layer/layer'
const Webuploader = require('assets/vendors/webuploader/webuploader')
// import Webuploader from 'assets/vendors/webuploader/webuploader'

export default {
  name: 'App',
  data () {
    return {
      msg: 'hello word'
    }
  },
  mounted () {
    console.log(toastr)
    console.log(layer)
    console.log(Webuploader)
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
