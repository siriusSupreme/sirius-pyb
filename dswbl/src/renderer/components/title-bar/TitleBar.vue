<template>
  <div
    class='gs-title-bar-wrapper'
    ref="titleBar"
  >
    <!-- 左侧返回、面包屑导航 start -->
    <div class='gs-title-bar-left'>
      <i
        class='fa fa-chevron-left gs-title-bar-back'
        @click.stop='backHandler'
      ></i>

      <el-breadcrumb
        v-if="breadcrumbs.length"
        class='gs-title-bar-breadcrumb'
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item
          v-for='(breadcrumb, index) in breadcrumbs'
          :key="index"
        >{{breadcrumb.text || breadcrumb}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 左侧返回、面包屑导航 end -->

    <!-- 左侧用户信息、操作 start -->
    <div class='gs-title-bar-right'>
      <div class='gs-title-bar-userinfo'>
        办案单位：<span class='gs-title-bar-user-department'>体验单位</span><span class='gs-title-bar-username'>体验</span>
      </div>

      <ul class='gs-title-bar-message-lists'>
        <li class='gs-title-bar-message-item'>
          <i class="fa fa-bell"></i>
        </li>
        <li class='gs-title-bar-message-item'>
          <i class="fa fa-commenting"></i>
        </li>
        <li class='gs-title-bar-message-item'>
          <!-- <i class="fa fa-caret-down"></i> -->
          <el-dropdown @command='commandHandler'>
            <span class="el-dropdown-link">
              <i class="fa fa-caret-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='print'>
                <i class="fa fa-print"></i> 打印空白文书
              </el-dropdown-item>
              <el-dropdown-item command='law'>
                <i class="fa fa-search"></i> 法规查询
              </el-dropdown-item>
              <el-dropdown-item command='category'>
                <i class="fa fa-th-large"></i> 笔录类型
              </el-dropdown-item>
              <el-dropdown-item command='import'>
                <i class="fa fa-database"></i> 导入数据
              </el-dropdown-item>
              <el-dropdown-item
                command='password'
                :divided='true'
              >
                <i class="fa fa-key"></i> 修改密码
              </el-dropdown-item>
              <el-dropdown-item command='userinfo'>
                <i class="fa fa-user"></i> 用户信息
              </el-dropdown-item>
              <el-dropdown-item command='about'>
                <i class="fa fa-life-ring"></i> 关于我们
              </el-dropdown-item>
              <el-dropdown-item command='switchover'>
                <i class="fa fa-retweet"></i> 切换用户
              </el-dropdown-item>
              <el-dropdown-item command='trash'>
                <i class="fa fa-trash"></i> 回收箱
              </el-dropdown-item>
              <el-dropdown-item command='log'>
                <i class="fa fa-clipboard"></i> 上传导出日志
              </el-dropdown-item>
              <el-dropdown-item command='font'>
                <i class="fa fa-font"></i> 字体资源
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>

      <ul class='gs-title-bar-system-lists'>
        <li class='gs-title-bar-system-item'>
          <i
            class="fa fa-window-minimize"
            @click.stop='minimizeHandler'
          ></i>
        </li>
        <li class='gs-title-bar-system-item'>
          <i
            class="fa fa-window-maximize"
            :class="{'fa-window-restore': isRestore}"
            @click.stop='maximizeHandler'
          ></i>
        </li>
        <li class='gs-title-bar-system-item'>
          <i
            class="fa fa-window-close"
            @click.stop='closeHandler'
          ></i>
        </li>
      </ul>
    </div>
    <!-- 左侧用户信息、操作 end -->
  </div>
</template>


<script>
import {ipcRenderer, remote} from 'electron'
import electronDrag from 'electron-drag'

import commands from './command.js'

export default {
  name: 'TitleBar',
  props: {
    breadcrumbs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isRestore: false
    }
  },
  created () {
    this.isRestore = remote.getCurrentWindow().isMaximized()

    this.electronDragClear = null
  },
  mounted () {
    this.$nextTick(() => {
      this.initializeDrag()
    })
  },
  beforeDestroy () {
    this.destroyDrag()
    this.electronDragClear = null
  },
  methods: {
    initializeDrag () {
      if(electronDrag.supported){
        this.electronDragClear = electronDrag(this.$refs.titleBar)
      } else {
        // this.$refs.titleBar.style['-webkit-app-region'] = 'drag'
      }
    },
    destroyDrag () {
      if(electronDrag.supported && this.electronDragClear){
        this.electronDragClear()
      } else {
        delete this.$refs.titleBar.style['-webkit-app-region']
      }
    },
    backHandler () {
      this.$router.back()
    },
    minimizeHandler () {
      ipcRenderer.send('main-minimize')
    },
    maximizeHandler () {
      this.isRestore = !this.isRestore

      // ipcRenderer.send('main-maximize')

      if (remote.getCurrentWindow().isMaximized()) remote.getCurrentWindow().unmaximize()
      else remote.getCurrentWindow().maximize()
    },
    closeHandler () {
      this.$msgbox({
        title: '提示',
        message: '你确定要退出系统吗？点击取消返回首页',
        type: 'warning',
        showCancelButton: 'true',
        distinguishCancelAndClose: true
      }).then(() => {
        ipcRenderer.send('window-all-closed')
      }).catch(action  => {
        if (action === 'cancel') this.$router.back()
      })
    },
    commandHandler (command) {
      let _command = commands[command]

      if (_command) {
        _command.bind(this)()
      } else {
        this.$message.warning('请核实命令')
      }
    }
  }
}
</script>
