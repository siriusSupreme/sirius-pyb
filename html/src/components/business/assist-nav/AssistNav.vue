<template>
  <div class="dsw-assist-container">
    <nav class="dsw-assist-wrapper clearfix">
      <ul class="dsw-assist-lists pull-right">
        <li class="dsw-assist-item">
          <a href="javascript:void(0);" class="dsw-assist-item-a">
            <i class="dsw-assist-item-a-icon fa fa-bell"></i>
            <span class="dsw-assist-item-a-title">消息提醒</span>
          </a>
        </li>
        <li class="dsw-assist-item" @mouseenter="mouseEnterHandler" @mouseleave="mouseOutHandler">
          <a href="javascript:void(0);" class="dsw-assist-item-a">
            <i class="dsw-assist-item-a-icon fa fa-user"></i>
            <span class="dsw-assist-item-a-title">{{userInfo.account}}</span>
          </a>
          <ul class="dsw-assist-lists dsw-sub-assist-lists" :class="{'hidden':!isShowAdminProfile}">
            <li class="dsw-assist-item">
              <a href="javascript:void(0);" class="dsw-assist-item-a" @click="modifyPasswordHandler">修改密码</a>
            </li>
            <li class="dsw-assist-item">
              <a href="javascript:void(0);" class="dsw-assist-item-a" @click="logoutHandler">退出登录</a>
            </li>
          </ul>
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
</template>

<script>
import getCurrentUserInfo from 'mixins/get-current-user-info'

export default {
  name: 'AssistNav',
  data () {
    return {
      isShowAdminProfile: false,
      userInfo: {}
    }
  },
  mixins: [getCurrentUserInfo],
  created () {
    this.getCurrentUserInfo().then((result) => {
      this.userInfo = result
    }).catch((reason) => {
      this.$toastr.error('获取用户信息失败')
    })
  },
  methods: {
    mouseEnterHandler (e) {
      this.isShowAdminProfile = true
    },
    mouseOutHandler (e) {
      this.isShowAdminProfile = false
    },
    logoutHandler (e) {
      localStorage.removeItem('dsw-token-info')
      location.href = '/login.html'
    },
    modifyPasswordHandler (e) {

    }
  }
}
</script>

<style lang="stylus">
  .dsw-assist-container{
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 0.35rem 0 0;
    .dsw-assist-wrapper{
      height :36px;
      line-height :36px;
      .dsw-assist-lists{
        .dsw-assist-item{
          position : relative;
          display : inline-block;
          padding :0 10px 0 0;
          .dsw-assist-item-a{
            .dsw-assist-item-a-icon{

            }
            .dsw-assist-item-a-title{

            }
          }
          .dsw-sub-assist-lists{
            position: absolute;
            top: 36px;
            left: 0;
            z-index: 2;
            width: 80px;
            text-align: center;
            padding : 10px 0;
            background : url("./images/pop-bg.png") no-repeat scroll 0 0/100% 100%;
            .dsw-assist-item{
              display : block;
              line-height : normal;
              padding :5px;
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
    }
  }
</style>

<style lang="stylus" scoped>

</style>
