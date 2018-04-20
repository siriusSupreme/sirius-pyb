<template >
  <div class="container" >
    <span @click="demo">demo</span>
   {{msg}}
  </div >
</template >

<script >

import Webuploader from 'webuploader'

export default {
  name: 'App',
  data () {
    return {
      msg: 'hello sirius ' + process.env.NODE_ENV
    }
  },
  mounted () {
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
