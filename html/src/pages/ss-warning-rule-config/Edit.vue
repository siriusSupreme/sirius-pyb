<template>
  <dialog-container :title="extraParams.title">
    <div class="dsw-form-wrapper">
      <form class="form-horizontal" >
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >规则类型：</label>
          <div class="col-sm-9">
            <select class="form-control" name="type" v-model="info.type" >
              <option v-for="(option, index) in options" :key="index" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >机构：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="name" v-model="info.name" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >预警分类：</label>
          <div class="col-sm-9">
            <select class="form-control" name="wtType" v-model="info.wtType" >
              <option v-for="(option, index) in wtOptions" :key="index" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >业务分类：</label>
          <div class="col-sm-9">
            <select class="form-control" name="bizType" v-model="info.bizType" >
              <option v-for="(option, index) in bizOptions" :key="index" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >投屏是否显示：</label>
          <div class="col-sm-9">
            <select class="form-control" name="isShow" v-model="info.isShow" >
              <option v-for="(option, index) in isShowOptions" :key="index" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >预警时限：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="hostPName" v-model="info.warnTlimit" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >报警时限：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" v-model="info.alarmTlimit" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >投屏描述：</label>
          <div class="col-sm-9">
            <textarea name="remark" class="form-control" rows="3" v-model="info.showDesc" ></textarea >
          </div>
        </div>
      </form >
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'

export default {
  name: 'Edit',
  data () {
    return {
      options: [
        { text: '通用规则', value: '01' },
        { text: '机构规则', value: '02' }
      ],
      wtOptions: [
        { text: '其他', value: '01' },
        { text: '案件处理', value: '02' }
      ],
      bizOptions: [
        { text: '借阅预警处理', value: '20' },
        { text: '整改预警处理', value: '21' }
      ],
      isShowOptions: [
        { text: '是', value: '1' },
        { text: '否', value: '0' }
      ],
      info: {}
    }
  },
  components: {
    DialogContainer
  },
  beforeMount () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      const id = this.extraParams.ruleId
      this.$https.jsonp(this.$api.getRuleDetailById, {params: {id: id}}).then((result) => {
        this.info = result.data
      }).catch((reason) => {
        this.$toastr.error('获取预警规则配置详情失败')
      })
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
  .dsw-form-wrapper{
    width :60%;
    margin :0 auto;
  }
</style>
