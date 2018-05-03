<template>
  <dialog-container class="dsw-electronic-container" :title="extraParams['title']">
    <div class="dsw-electronic-wrapper">
      <ul class="dsw-electronic-lists">
        <li class="dsw-electronic-item">
          <div class="dsw-electronic-item-left">
            <img class="dsw-electronic-item-top" src="./images/star.png" alt="star" />
            <div class="dsw-electronic-item-middle">
              <span class="dsw-electronic-item-name">诉讼文书及技术鉴定材料部分</span>
              <span class="dsw-electronic-item-type">刑事侦查卷             正卷</span>
            </div>
            <div class="dsw-electronic-item-bottom">(180页)</div>
          </div>
        </li>
        <li class="dsw-electronic-item">
          <div class="dsw-electronic-item-left">
            <img class="dsw-electronic-item-top" src="./images/star.png" alt="star" />
            <div class="dsw-electronic-item-middle">
              <span class="dsw-electronic-item-name">证据部分</span>
              <span class="dsw-electronic-item-type">刑事侦查卷             正卷</span>
            </div>
            <div class="dsw-electronic-item-bottom">(180页)</div></div>
        </li>
        <li class="dsw-electronic-item">
          <div class="dsw-electronic-item-left">
            <img class="dsw-electronic-item-top" src="./images/star.png" alt="star" />
            <div class="dsw-electronic-item-middle">
              <span class="dsw-electronic-item-type">刑事侦查卷             副卷</span>
            </div>
            <div class="dsw-electronic-item-bottom">(180页)</div>
          </div>
        </li>
        <li class="dsw-electronic-item">
          <div class="dsw-electronic-item-left">
            <img class="dsw-electronic-item-top" src="./images/star.png" alt="star" />
            <div class="dsw-electronic-item-middle">
              <span class="dsw-electronic-item-type">行政处罚卷</span>
            </div>
            <div class="dsw-electronic-item-bottom">(180页)</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="dsw-btn-wrapper">
      <button class="dsw-btn">完整卷宗预览</button>
      <button class="dsw-btn">PDF卷宗下载</button>
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'
import DswPanel from  'components/common/panel'

export default {
  name: 'DossierListsElectronic',
  data () {
    return {
      currentIndex: 0
    }
  },
  components: {
    DialogContainer
  },
  created () {
    
  }
}
</script>

<style lang="stylus">
.dsw-electronic-container{
  text-align : center;
  .dsw-electronic-wrapper{
    height : 85%;
    display : inline-block;
    cursor : pointer;
    .dsw-electronic-lists{
      height :100%;
      overflow : hidden;
      .dsw-electronic-item{
        position : relative;
        float : left;
        height :100%;
        margin : 0 15px;
        padding : 24px 0 0 0;
        .dsw-electronic-item-left{
          width : 120px;
          height :100%;
          border : 20px solid #0e244a;
          background-color : #5095ff;
          .dsw-electronic-item-top{
            width :30px;
          }
          .dsw-electronic-item-middle{
            margin :24px 0 0 0;
            & > span{
              writing-mode :tb-rl;
              vertical-align :top;
            }
            .dsw-electronic-item-name {
              color : #443939;
              font-size :0.2rem;
            }
            .dsw-electronic-item-type {
              color : #0c0c0c;
              font-size :0.24rem;
              white-space :pre-wrap;
            }
          }
          .dsw-electronic-item-bottom{
            position : absolute;
            bottom : 32px;
            left : 50%;
            transform :translate(-50%,0);
            width : 100%;
            color : #443939;
          }
        }
      }
    }
  }
  .dsw-btn-wrapper{
    margin: 32px 0 0 0;
    .dsw-btn{
      height : 32px;
      line-height : 32px;
      background : url("./images/btn.png") no-repeat scroll 0 0/100% 100%;
      padding :0 30px;
      margin :0 10px;
      &:hover{
        background : url("./images/btn-hover.png") no-repeat scroll 0 0/100% 100%;
      }
    }
  }
}
</style>

<style lang="stylus" scoped>

</style>
