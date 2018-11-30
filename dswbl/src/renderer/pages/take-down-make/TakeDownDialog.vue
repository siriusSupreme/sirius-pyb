<template>
  <el-dialog
    class='gs-dialog-wrapper bl-take-down-dialog-wrapper'
    :visible.sync='isVisible'
    width='50%'
    top=''
    custom-class='gs-dialog-box'
    :show-close='false'
    @open='openHandler'
    @close='closeHandler'
  >
    <div
      slot="title"
      class='gs-dialog-header bl-take-down-dialog-header'
    >
      <h2 class='gs-dialog-title'>请选择笔录类型、人员</h2>
      <i
        class='fa fa-times-circle gs-dialog-close'
        @click.stop='cancelHandler'
      ></i>
    </div>

    <!-- <bl-kind-editor></bl-kind-editor> -->

    <div class='bl-take-down-dialog-body'>
      <bl-content class='bl-take-down-dialog-scroll'>
        <ul class='bl-take-down-dialog-lists'>
          <li
            class='bl-take-down-dialog-item'
            v-for="item in typeLists"
            :key="item.id"
          >
            <div
              class='bl-take-down-dialog-item-wrapper'
              :class="{'bl-take-down-dialog-item-active': pid === item.id}"
              @click.stop='pid = item.id'
            >
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </bl-content>

      <bl-content class='bl-take-down-dialog-scroll'>
        <ul class='bl-take-down-dialog-lists'>
          <li
            class='bl-take-down-dialog-item'
            v-for="item in subLists"
            :key="item.id"
          >
            <div
              class='bl-take-down-dialog-item-wrapper'
              :class="{'bl-take-down-dialog-item-active': typeId === item.id}"
              @click.stop='typeId = item.id'
            >
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </bl-content>

      <bl-content class='bl-take-down-dialog-scroll'>
        <ul class='bl-take-down-dialog-lists'>
          <li
            class='bl-take-down-dialog-item'
            v-for="item in inquiryLists"
            :key="item.id"
          >
            <div
              class='bl-take-down-dialog-item-wrapper'
              :class="{'bl-take-down-dialog-item-active': inquiryId === item.id}"
              @click.stop='inquiryId = item.id'
            >
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </bl-content>
    </div>

    <div
      slot='footer'
      class='gs-dialog-footer bl-take-down-dialog-footer'
    >
      <button class='bl-take-down-dialog-type'><i class='fa fa-file-text'></i>常用笔录类型</button>

      <button
        class='bl-take-down-dialog-confirm'
        @click.stop='confirmHandler'
      >确定</button>
    </div>
  </el-dialog>
</template>

<script>
import {getTypeListsByPid, getInquiryListsByTypeId} from '@/api/take-down-make.js'

export default {
  name: 'TakeDownDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      typeLists: [],
      subLists: [],
      inquiryLists: [],
      pid: 0,
      typeId: 0,
      inquiryId: 0
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    pid (val) {
      this.getTypeListsByPid(val)
    },
    typeId (val) {
      this.getInquiryListsByTypeId(val)
    }
  },
  methods: {
    openHandler () {
      this.getTypeListsByPid()
    },
    closeHandler () {
      this.typeLists = []
      this.subLists = []
      this.inquiryLists = []
      this.pid = 0
      this.typeId = 0
      this.inquiryId = 0
    },
    confirmHandler () {
      this.isVisible = false

      if (this.typeId) this.$router.push(`/take-down-make/${this.typeId}/${this.inquiryId}`)
    },
    cancelHandler () {
      this.isVisible = false
    },
    getTypeListsByPid (pid = this.pid) {
      getTypeListsByPid(pid).then(({data}) => {
        let lists = data.lists

        if (pid) {
          this.subLists = lists
          this.typeId = lists[0].id
        } else {
          this.typeLists = lists
          this.pid = lists[0].id
        }
      })
    },
    getInquiryListsByTypeId (typeId = this.typeId) {
      this.inquiryId = 0

      getInquiryListsByTypeId(typeId).then(({data}) => {
        this.inquiryLists = data.lists
      })
    }
  }
}
</script>
