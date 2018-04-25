<template>
  <div class="dsw-panel panel">
    <div class="panel-heading">
      <slot name="panel-heading">
        <div class="panel-title">
          <span class="dsw-panel-title">黄石市公安局</span>
          <span class="dsw-panel-select-container">
            <span class="dsw-panel-select-wrapper">
              <select name="previace" class="dsw-panel-select">
              <option value="0" >请选择</option >
              <option value="1" >湖北省</option >
            </select >
            </span>
            <span class="dsw-panel-select-wrapper">
              <select name="city" class="dsw-panel-select">
                <option value="0" >请选择</option >
                <option value="1" >武汉市</option >
              </select >
            </span>
          </span>
        </div>
      </slot>
    </div>

    <div class="panel-body">
      <slot></slot>
    </div>

    <div class="panel-footer"><slot name="panel-footer"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Panel'
}
</script>

<style lang="stylus">
.dsw-panel{
  width :100%;
  height : 100%;
  border : none;
  /*background : url("./images/panel-bg.png") no-repeat scroll 0 0/100% 100%;*/
  .panel-title{
    .dsw-panel-title{

    }
    .dsw-panel-select-container{
      .dsw-panel-select-wrapper{
        position : relative;
        margin :0 0 0 20px;
        &::before{
          content : '-';
          position : absolute;
          top :0;
          left :-16px;
        }
        .dsw-panel-select{
          background-color :#112752;
          border :none;
        }
      }
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
