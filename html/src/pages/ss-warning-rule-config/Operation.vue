<template >
  <div class="dsw-operation-wrapper">
    <button class="dsw-btn" @click.stop="edit">编辑</button>
    <button class="dsw-btn" @click.stop="hidden">删除</button>
  </div>
</template >

<script >
export default {
  name: 'Operation',
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    hidden () {
      let params = {type: 'hidden', index: this.index, rowData: this.rowData}
      this.$emit('on-custom-comp', params)
    },

    edit () {
      let params = {type: 'edit', index: this.index, rowData: this.rowData}
      this.$emit('on-custom-comp', params)
    }
  }
}
</script >

<style lang="stylus" scoped >
.dsw-operation-wrapper{
  .dsw-btn{
    height : 32px;
    line-height : 32px;
    padding : 0 15px;
    margin : 0;
    background : url("./images/operation-btn.png") no-repeat scroll 0 0/100% 100%;
    color : #ff9b00;
  }
}
</style >
