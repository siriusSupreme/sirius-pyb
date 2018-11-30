<template>
  <article class='bl-take-down-make-wrapper'>
    <bl-title-bar
      class='bl-take-down-make-titlebar'
      :breadcrumbs='breadcrumbs'
    ></bl-title-bar>

    <bl-content class='bl-take-down-make-content'>
      <div class='bl-take-down-make-content-wrapper'>
        <!-- 左侧表单 start -->
        <div class='bl-take-down-make-content-left' v-show="!isBlTakeDownMake">
          <div class='bl-take-down-make-form-header'>
            <span class='bl-take-down-make-form-tips'>带 ※ 为必填项</span>
            <el-button
              class='bl-take-down-make-form-start'
              type='primary'
              @click="primaryHandler"
            >开始笔录</el-button>
          </div>

          <fm-generate-form
            ref="generateForm"
            :data='jsonData'
            :value='editData'
            :remote='remoteMethods'
          ></fm-generate-form>

          
        </div>
        <!-- 左侧表单 end -->

        <!-- 中间模板 start -->
        <div class='bl-take-down-make-content-center'>
          <div class="bl-take-down-make-content-save-btn">
            <el-button
              class='bl-take-down-make-form-save'
              type=primary
              @click.native='getDataHandler'
            >保存</el-button>
          </div>

          <bl-editor :templateData="templateData" :isTemplateData="true"></bl-editor>
        </div>
        <!-- 中间模板 end -->

        <!--右边模板 start -->
        <div class="bl-take-down-make-content-right" v-show="isBlTakeDownMake">
          <div class="bl-take-down-make-content-right-template">
            <p class="bl-take-down-make-hint">(提示: 双击模板内容中会自动新增到正文区域)</p>
            <p class="bl-take-down-make-content-right-template-frame" v-for="(item, index) in questionTemplateData" :key="index" :class="{ 'bl-take-down-make-template-active': index === templateIndex }" @dblclick="dblTemplateFrameHandler(item.text)" @click="TemplateFrameHandler(index)">
              {{ item.text }}
            </p>
          </div>
        </div>
        <!--右边模板 end -->
      </div>
    </bl-content>
  </article>
</template>

<script>
import {getFormJsonData, getFormData, saveFormData} from '@/api/take-down-make.js'

import Vue from 'vue'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.use(FormMaking)

export default {
  name: 'TakeDownMake',
  props: {
    typeId: {
      type: [String, Number],
      required: true
    },
    inquiryId: {
      type: [String, Number],
      default: 0
    },
    blHeaderId: {
      type: [String, Number],
      default: 23
    }
  },
  data () {
    return {
      // 表单信息
      jsonData: {
        list: [],
        config: {}
      },
      editData: {},
      remoteMethods: {},

      // 暂时点击保存后显示模板编辑界面
      isBlTakeDownMake: false,

      // title-bar
      breadcrumbs: [{text: '笔录制作'}, '刑事笔录', '刑事询问笔录'],

      // 问答模板
      questionTemplateData: [
        { text: '根据法律规定,我们请通晓手语的人XXX到现场,请他提供帮助,你明白了吧(通过手语)?' },
        { text: '根据法律规定,我们请XXX担任翻译人员,你明白了吗(通过翻译)?' },
        { text: '你的个人简历?' },
        { text: '你的家庭情况?' },
        { text: '你是否是人大代表或协助委员?' },
        { text: '你有无参加何种组织或社会团体,有无何职务?' },
        { text: '身体是否健康?' },
        { text: '你有权申请有关办案人员回避,你是否申请?' },
        { text: '你的个人情况?' },
        { text: '公安机关在询问区间是否保障你的饮食和休息?' },
        { text: '是否有补充?' },
        { text: '以上所说是否属实?' },
        { text: '以上笔录请你仔细阅看,请在确认后在笔录上签字捺印。' }
      ],
      templateIndex: -1,
      templateData: []
    }
  },
  created () {
    this.formId = 0
    this.caseId = 0

    this.getFormJsonData()
  },
  methods: {
    getFormJsonData () {
      getFormJsonData('bl_header', this.typeId
      ).then(({data}) => {
        this.formId = data.formId
        this.jsonData = data.formMark

        this.getFormData()
      })
    },
    getFormData () {
      let blHeaderId = this.blHeaderId

      if (blHeaderId) {
        getFormData(blHeaderId).then(({data}) => {
          this.editData = data || {}
          this.caseId = this.editData.caseId || 0
        })
      }
    },
    getDataHandler () {
      this.$refs.generateForm.getData().then(data => {
        let typeId = this.typeId
        let formId = this.formId
        let caseId = this.caseId

        let _data = {formData: {...data, caseId}, typeId, formId}

        saveFormData(_data).then(() => {
          this.blEditorVisible = true
        }).catch(error => {
          this.$message.error(error.message)
        })
      })
    },
    primaryHandler () {
      this.isBlTakeDownMake = true
    },
    TemplateFrameHandler (index) {
      this.templateIndex = index
    },
    dblTemplateFrameHandler (text) {
      console.log(text)
      let arr = [
        {
          question: text,
          answers: ['']
        }
      ]
      this.templateData = arr
    }
  }
}
</script>
