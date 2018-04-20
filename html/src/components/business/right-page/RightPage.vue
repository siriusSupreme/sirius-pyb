<template>
  <div class="dsw-right-page">
    <!--页面辅助工具 start-->
    <div class="dsw-assist-container">
      <nav class="dsw-assist-wrapper clearfix">
        <ul class="dsw-assist-lists pull-right">
          <li class="dsw-assist-item">
            <a href="javascript:void(0);" class="dsw-assist-item-a">
              <i class="dsw-assist-item-a-icon fa fa-bell"></i>
              <span class="dsw-assist-item-a-title">消息提醒</span>
            </a>
          </li>
          <li class="dsw-assist-item">
            <a href="javascript:void(0);" class="dsw-assist-item-a">
              <i class="dsw-assist-item-a-icon fa fa-user"></i>
              <span class="dsw-assist-item-a-title">admin</span>
            </a>
          </li>
          <li class="dsw-assist-item">
            <a href="javascript:void(0);" class="dsw-assist-item-a">
              <i class="dsw-assist-item-a-icon fa fa-question-circle"></i>
              <span class="dsw-assist-item-a-title">帮助</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!--页面辅助工具 end-->
    <!--tab 容器 start-->
    <div class="dsw-tab-container" ref="dsw-tab-container">
      <!--tab 项 start-->
      <nav class="dsw-tab-lists-wrapper" ref="dsw-tab-lists-wrapper">
        <ul class="dsw-tab-lists">
          <li class="dsw-tab-lists-item active">
            <a href="javascript:void(0);" class="dsw-tab-lists-item-a">
              <span class="dsw-tab-lists-item-a-title">首页</span>
            </a>
          </li>
          <li class="dsw-tab-lists-item">
            <a href="javascript:void(0);" class="dsw-tab-lists-item-a">
              <span class="dsw-tab-lists-item-a-title">标签 tab-01</span>
              <i class="dsw-tab-lists-item-a-icon fa fa-close"></i>
            </a>
          </li>
          <li class="dsw-tab-lists-item">
            <a href="javascript:void(0);" class="dsw-tab-lists-item-a">
              <span class="dsw-tab-lists-item-a-title">标签 tab-02</span>
              <i class="dsw-tab-lists-item-a-icon fa fa-close"></i>
            </a>
          </li>
          <li class="dsw-tab-lists-item">
            <a href="javascript:void(0);" class="dsw-tab-lists-item-a">
              <span class="dsw-tab-lists-item-a-title">标签 tab-03</span>
              <i class="dsw-tab-lists-item-a-icon fa fa-close"></i>
            </a>
          </li>
        </ul>
      </nav>
      <!--tab 项 end-->
      <!--tab 页 start-->
      <div class="dsw-tab-pages-wrapper" ref="dsw-tab-pages-wrapper">
        <ul class="dsw-tab-pages">
          <li class="dsw-tab-pages-item">
            <iframe src="/login.html" frameborder="0" scrolling="no" width="100%" height="100%" name="demo" class="dsw-tab-pages-item-iframe"></iframe>
          </li>
        </ul>
      </div>
      <!--tab 页 end-->
    </div>
    <!--tab 容器 end-->
  </div>
</template>

<script>
export default {
  name: 'RightPage',
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    const containerHeight = this.$refs['dsw-tab-container'].clientHeight
    const tabListsHeight = this.$refs['dsw-tab-lists-wrapper'].clientHeight

    this.$refs['dsw-tab-pages-wrapper'].style.height = (containerHeight - tabListsHeight) + 'px'
  }
}
</script>

<style lang="stylus">
.dsw-right-page{
  height : 100%;
  overflow : hidden;
  padding :0 10px;
  .dsw-assist-container{
    .dsw-assist-wrapper{
      height :36px;
      line-height :36px;
      .dsw-assist-lists{
        .dsw-assist-item{
          display : inline-block;
          padding :0 10px 0 0;
          .dsw-assist-item-a{
            .dsw-assist-item-a-icon{

            }
            .dsw-assist-item-a-title{

            }
          }
        }
      }
    }
  }
  .dsw-tab-container{
    .dsw-tab-lists-wrapper{
      .dsw-tab-lists{
        height :36px;
        line-height :36px;
        .dsw-tab-lists-item{
          display : inline-block;
          background : url("./images/tab-bg.png") no-repeat scroll 0 0/100% 100%;
          padding :0 10px;
          &:hover,&.active{
            background : url("./images/tab-hover-bg.png") no-repeat scroll 0 0/100% 100%;
          }
          .dsw-tab-lists-item-a{
            .dsw-tab-lists-item-a-icon{

            }
            .dsw-tab-lists-item-a-title{

            }
          }
        }
      }
    }
    .dsw-tab->pages-wrapper{
      .dsw-tab->pages{
        height :100%
        .dsw-tab->pages-item{
          height :100%
          .dsw-tab-pages-item-iframe{

          }
        }
      }
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
