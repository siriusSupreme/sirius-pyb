<template >
  <dialog-container :title="extraParams.title">
    <div class="dsw-form-wrapper">
      <form class="form-horizontal" >
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >角色名称：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" name="roleName" v-model="info.roleName" />
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label col-sm-3 dsw-required" >角色描述：</label>
          <div class="col-sm-9">
            <textarea name="remark" class="form-control" rows="3" v-model="info.remark" ></textarea >
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
      </form >
    </div>
  </dialog-container>
</template >

<script >

import DialogContainer from 'components/common/dialog-container'

export default {
  name: 'Edit',
  data () {
    return {
      items: [],
      info: {}
    }
  },
  components: {
    DialogContainer
  },
  beforeMount () {
    this.getInfo()
    this.getMenuSelectedListByRoleId()
  },
  methods: {
    getMenuSelectedListByRoleId () {
      const id = this.extraParams.roleId
      debugger
      this.$https.jsonp(this.$api.getRoleMenuSelectedListByRoleId, {params: {id: id}}).then((result) => {
        this.items = result.data.lists
      }).catch((reason) => {
        this.$toastr.error('获取带有选择属性菜单失败')
      })
    },
    getInfo () {
      const id = this.extraParams.roleId
      this.$https.jsonp(this.$api.getRoleDetailById, {params: {id: id}}).then((result) => {
        this.info = result.data
      }).catch((reason) => {
        this.$toastr.error('获取角色配置详情失败')
      })
    }
  }
}
</script >

<style scoped >

</style >
