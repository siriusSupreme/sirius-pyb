<template>
  <dialog-container :title="extraParams.title">
    <div class="dsw-form-wrapper">
      <form class="form-horizontal" >
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >角色名称：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="caseNo" v-model="caseName" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >角色描述：</label>
          <div class="col-sm-9">
            <textarea name="remark" class="form-control" rows="3" v-model="remark" ></textarea >
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >权限菜单：</label>
          <div class="col-sm-9">
            <label class="c-input c-checkbox" v-for="(item, index) in items" :key="index">
              <input type="checkbox" v-model="item.selected">
              <span class="c-indicator">{{ item.name }}</span>
            </label>
          </div>
        </div>
        <div class="form-group form-group-sm">
          <button type="submit" class="btn btn-primary"  @click="send">Submit</button>
        </div>
      </form >
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'

export default {
  name: 'Add',
  data () {
    return {
      dictionary: {
        'MENUS': {}
      },
      items: [{
        id: 14,
        name: '系统设置',
        selected: false,
        pid: 0
      }, {
        id: 37,
        name: '机构管理',
        selected: false,
        pid: 14
      }, {
        id: 38,
        name: '预警配置管理',
        selected: false,
        pid: 14
      }, {
        id: 39,
        name: '柜子配置',
        selected: false,
        pid: 14
      }, {
        id: 40,
        name: '案管室配置',
        selected: false,
        pid: 14
      }],
      arr: [],
      caseName: '',
      remark: ''
    }
  },
  components: {
    DialogContainer
  },
  created () {
    // 获取菜单 并且 设置过滤器
  },
  methods: {
    send: function () {
      // 清空数组
      this.arr = []
      // 获取被勾选的项的id，然后返回
      for (var i = 0, length = this.items.length; i < length; i++) {
        if (this.items[ i ].selected === true) {
          this.arr.push(this.items[ i ].id)
        }
      }

      // 发送ajax请求
      const menuIds = this.arr
      const roleName = this.caseName
      const remark = this.remark
      debugger
      // console.log(menuIds.length)
      this.$https.post(this.$api.saveRole, {menuIds, roleName, remark}).then((result) => {
        this.tableData = result.data.lists
        this.paginateInfo = result.data.pageDto
        this.isLoadingForTable = false
      }).catch((reason) => {
        this.$toastr.error('新增角色失败')
        this.isLoadingForTable = false
      })
    }
  },
  computed: {

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
