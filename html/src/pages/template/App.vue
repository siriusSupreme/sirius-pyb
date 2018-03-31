<template >
  <div class="container" >
    <span @click="demo">demo</span>
   {{msg}}
  </div >
</template >

<script >
import toastr from 'toastr'
import 'assets/vendors/layer/theme/default/layer.css'
const layer = require('assets/vendors/layer/layer')
// import layer from 'assets/vendors/layer/layer'
const Webuploader = require('assets/vendors/webuploader/webuploader')
// import Webuploader from 'assets/vendors/webuploader/webuploader'

export default {
  name: 'App',
  data () {
    return {
      msg: 'hello sirius ' + process.env.NODE_ENV
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
    span {
      cursor : pointer
    }
  }
</style >

<style lang="stylus" scoped >
  .container{
    background-color: red
  }
</style >
