<template>
  <article class='bl-take-down-make-wrapper'>
    <bl-title-bar
      class='bl-take-down-make-titlebar'
      :breadcrumbs='breadcrumbs'
    ></bl-title-bar>

    <bl-content class='bl-take-down-make-content'>
      <div class='bl-take-down-make-content-wrapper'>
        <div class='bl-take-down-make-content-left'>
          <div class='bl-take-down-make-form-header'>
            <span class='bl-take-down-make-form-tips'>带 ※ 为必填项</span>
            <el-button
              class='bl-take-down-make-form-start'
              type='primary'
            >开始笔录</el-button>
          </div>

          <div class='bl-take-down-make-form'>
            <div class='bl-take-down-make-form-header'>
              <span class='bl-take-down-make-form-title'>案件基本信息</span>
              <el-button
                class='bl-take-down-make-form-helis'
                type='text'
              >选择已有案件</el-button>
            </div>

            <fm-generate-form
              ref="caseGenerateForm"
              :data='caseJsonData'
              :value='caseEditData'
              :remote='caseRemoteMethods'
            ></fm-generate-form>
          </div>

          <div class='bl-take-down-make-form'>
            <div class='bl-take-down-make-form-header'>
              <span class='bl-take-down-make-form-title'>人员基本信息</span>
              <el-button
                class='bl-take-down-make-form-trial'
                type='text'
              >启动审讯室</el-button>
            </div>

            <fm-generate-form
              ref="personGenerateForm"
              :data='personJsonData'
              :value='personEditData'
              :remote='personRemoteMethods'
            ></fm-generate-form>
          </div>

          <div class='bl-take-down-make-form'>
            <div class='bl-take-down-make-form-header'>
              <span class='bl-take-down-make-form-title'>其他在场人员</span>
              <el-button
                class='bl-take-down-make-form-expand'
                type='text'
              ><i class='fa fa-caret-down'></i>展开</el-button>
            </div>

            <el-form
              ref="form"
              :model='fromModel'
              :rules='formRules'
              label-position='right'
              label-width='80px'
              :status-icon='true'
              @submit.native.prevent
            >
              <el-form-item label='证件号码'>
                <el-input></el-input>
              </el-form-item>

            </el-form>
          </div>

          <el-button
            class='bl-take-down-make-form-save'
            type=primary
            @click.native='getDataHandler'
          >保存</el-button>
        </div>

        <div class='bl-take-down-make-content-right'>
          <div>
            工具
          </div>

          <bl-table :data='[]'></bl-table>
        </div>
      </div>
    </bl-content>
  </article>
</template>

<script>
import {getFormJsonData} from '@/api/take-down-make.js'

import Vue from 'vue'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

import caseJsonData from './case-form-making.json'
import personJsonData from './person-form-making.json'

Vue.use(FormMaking)

export default {
  name: 'TakeDownMake',
  data () {
    return {
      // 案件基本信息
      caseJsonData: {
        list: [],
        config: {}
      },
      caseEditData: {},
      caseRemoteMethods: {},
      // 人员基本信息
      personJsonData: {
        list: [],
        config: {}
      },
      personEditData: {},
      personRemoteMethods: {},
      // 其他信息
      formModel: {},
      formRules: {},

      // title-bar
      breadcrumbs: [{text: '笔录制作'}, '刑事笔录', '刑事询问笔录']
    }
  },
  created () {
    this.caseJsonData = caseJsonData
    this.personJsonData = personJsonData

    this.getFormJsonData()
  },
  methods: {
    getFormJsonData () {
      getFormJsonData('bl_header', 2).then(({data}) => {
        // this.caseJsonData = data
      })
    },
    getDataHandler () {
      let caseData = this.$refs.caseGenerateForm.getData()
      let personData = this.$refs.personGenerateForm.getData()

      Promise.all([caseData, personData]).then(results => {
        console.log(results)
      })
    }
  }
}
</script>
