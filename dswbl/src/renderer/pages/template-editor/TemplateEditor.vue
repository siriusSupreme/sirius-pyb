<template>
  <div id="template-editor">
    <div class="template-editor-top">
      <span class="template-editor-top-title">查看模板</span>
      <span class="template-editor-top-close" @click.stop="closeHanlder">X</span>
    </div>
    <div class="template-editor-search">
      <el-form inline :model="searchForm" ref="searchForm" label-width="80px" class="searchForm">
        <el-form-item label="所属类型:">
          <el-select v-model="searchForm.belongsToTypeOne" placeholder="请选择类型" @change="belongsToTypeOneHandler" class="searchForm-share-status-select">
            <el-option :label="'请选择'" :value="''"></el-option>
            <el-option
              v-for="item in belongsToTypeDataOne"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="searchForm.belongsToTypeTwo" placeholder="请选择类型" @change="belongsToTypeTwoHandler" class="searchForm-share-status-select">
            <el-option :label="'请选择'" :value="''"></el-option>
            <el-option
              v-for="item in belongsToTypeDataTwo"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="searchForm.belongsToTypeThree" placeholder="请选择类型" @change="belongsToTypeThreeHandler" class="searchForm-share-status-select">
            <el-option :label="'请选择'" :value="''"></el-option>
            <el-option
              v-for="item in belongsToTypeDataThree"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <!-- <button type="button" class="search-form-search-button">基于模板</button> -->
        </el-form-item>
        <el-form-item label="所属类别:">
          <el-cascader v-model="searchForm.belongsToCategory" :options="belongsToCategoryData" :props="belongsToCaegoryProps" change-on-select @change="belongsToCategoryHandler" placeholder="请选择所属类别"></el-cascader>
          <!-- <bl-cascader v-model="searchForm.belongsToCategory" :options="belongsToCategoryData" :props="belongsToCaegoryProps" :placeholder="'请选择所属类别'" @change="belongsToCategoryHandler"></bl-cascader> -->
        </el-form-item>
        <el-form-item label="案由">
          <bl-select v-model="searchForm.caseCause" :remote="true" :optionsData="optionsData" :key-map="{ label: 'name', value: 'id' }" :url="'/SysDataRpc/listCaseMsgParam'"></bl-select>
        </el-form-item>
        <el-form-item label="模板名称:">
          <el-input v-model="searchForm.templateName"  placeholder="输入模板名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="template-editor-bottom">
      <div class="template-editor-bottom-title-wrapper">
        <span class="template-editor-bottom-title">模板内容:</span>
      </div>
      <div class="template-editor-bottom-content-wrapper">
        <bl-editor :templateData="templateData" :isTemplateData="isTemplateData" :isReadOnly="true" @create-editor="createEditorHandler">
          <div slot="button" class="template-editor-bottom-button-wrapper" slot-scope="{ data }">
            <button class="template-editor-bottom-button-common" @click.stop="templateEditorComfirmHandler(data)">确定</button>
            <button class="template-editor-bottom-button-common" @click.stop="templateEditorCancelHandler">取消</button>
          </div>
        </bl-editor>
      </div>
    </div>
  </div>
</template>

<script>
import { save, findDetailById, listTemplateByPage, findInquiryListByTypeId, listCaseMsgParam, listSysTypeById, listCategoryByPage, selectAllOrg } from '@/api/template-manage'
export default {
  data () {
    return {
      msg: 'welcome to editor',
      searchForm: {
        belongsToTypeOne: '',
        belongsToTypeTwo: '',
        belongsToTypeThree: '',
        belongsToType: '',
        inquiryObj: '',
        belongsToCategory: [],
        caseCause: '',
        templateName: ''
      },
      belongsToCategory: '',
      belongsToTypeDataOne: [],
      belongsToTypeDataTwo: [],
      belongsToTypeDataThree: [],
      belongsToCategoryData: [],
      caseCauseData: [],
      templateData: [],
      optionsData: [],
      belongsToCaegoryProps: {
        label: 'name',
        value: 'id',
        children: 'categoryDos'
      }
    }
  },
  created () {
    this.ipc = this.$electron.ipcRenderer
    this.templateId = this.$electron.remote.getGlobal('commonData').templateTableId
    this.isTemplateData = this.$electron.remote.getGlobal('commonData').isTemplateData
    this.editor = null
    this.listCategoryByPage().then(() => {
      if (this.isTemplateData) {
        this.findDetailById(this.templateId)
      } else {
        this.listSysTypeById(0).then(({ code, data, msg }) => {
          this.belongsToTypeDataOne = data.lists
        })
      }
    })
    this.createEditorHandler()
  },
  methods: {
    findDetailById (id) {
      return findDetailById(id).then(({code, data, msg}) => {
        let obj = {}
        obj.id = data.caseMsg - 0
        obj.name = data.caseMsgName
        this.searchForm.caseCause = data.caseMsg - 0
        this.searchForm.templateName = data.name
        this.optionsData.push(obj)
        this.templateData = data.templateLineVos
        // start 三级联动处理
        if (data.typePid) {
          let typePid = data.typePid - 0
          this.listSysTypeById(typePid)
          .then(({ code, data, msg }) => {
            this.belongsToTypeDataOne = data.lists
            this.belongsToTypeOne = typePid
          })
          .then(() => {
            if (data.type) {
              let type = Number(data.type)
              this.listSysTypeById(type)
              .then(({ code, data, msg }) => {
                this.belongsToTypeDataTwo = data.lists
                this.belongsToTypeTwo = type
              })
            }
          })
        } else {
          let typePid = data.typePid - 0
          this.listSysTypeById(typePid)
          .then(({ code, data, msg }) => {
            this.belongsToTypeDataOne = data.lists
            this.belongsToTypeOne = typePid
          }).then(() => {
            if (data.type) {
              let type = data.type
              this.listSysTypeById(type)
              .then(({ code, data, msg }) => {
                this.belongsToTypeDataTwo = data.lists
                this.belongsToTypeTwo = type
              })
              .then(() => {
                if (data.inquiryObj) {
                  let inquiryObj = data.inquiryObj
                  this.findInquiryListByTypeId(inquiryObj).then(({ code, data, msg }) => {
                    this.belongsToTypeThree = data.type - 0
                    this.belongsToTypeThree = inquiryObj
                  })
                }
              })
            }
          })
        }
        // end 三级联动处理
        // start 级联数据深度查询合并
        if (data.category) {
          let category = data.category - 0
          let arr = []
          let categoryArr = []
          arr = this.belongsToCategoryData
          const handler = (children, id) => {
            if (children.id === id) {
              if (children.pid) {
                for (let k = 0; k < arr.length; k++) {
                  handler(arr[k], children.pid)
                }
              }
              categoryArr.push(children.id)
            } else {
              if (children.categoryDos && children.categoryDos.length) {
                for (let u = 0; u < children.categoryDos.length; u++) {
                  handler(children.categoryDos[u], id)
                }
              }
            }
          }
        for (let i = 0; i < arr.length; i++) {
          handler(arr[i], category)
        }
        this.searchForm.belongsToCategory = categoryArr
        let handlerArr = categoryArr.map(item => {
          return item
        })
        this.belongsToCategory = handlerArr.pop()
        }
          // end 级联数据深度查询合并
      })
    },
    save (templateData) {
      if (this.searchForm.belongsToTypeThree) {
        this.searchForm.inquiryObj = this.searchForm.belongsToTypeThree
      }  if (this.searchForm.belongsToTypeTwo) {
        this.searchForm.belongsToType = this.searchForm.belongsToTypeTwo
      } else if (this.searchForm.belongsToTypeOne) {
        this.searchForm.belongsToType = this.searchForm.belongsToTypeOne
      } else {
        this.searchForm.belongsToType = ''
      }
      return save({ templateName: this.searchForm.templateName, belongsToType: this.searchForm.belongsToType, inquiryObj: this.searchForm.inquiryObj, belongsToCategory: this.belongsToCategory, caseCause: this.searchForm.caseCause, id: this.templateId, templateData })
      .then(({code, data, msg}) => {
        this.$message.success(msg)
      })
      .then(() => {
        this.closeHanlder()
      })
    },
    // 和TemplateContent组件相同的一套逻辑 可以写成mixins
    listSysTypeById (id) {
      return listSysTypeById(id)
    },
    findInquiryListByTypeId (id) {
      return findInquiryListByTypeId(id)
    },
    listCategoryByPage () {
      return listCategoryByPage().then(({code, data, msg}) => {
        this.belongsToCategoryData = data.lists
      })
    },
    belongsToTypeOneHandler () {
      this.searchForm.belongsToTypeTwo = ''
      this.searchForm.belongsToTypeThree = ''
      if (!this.searchForm.belongsToTypeOne) {
        this.searchForm.belongsToTypeOne = ''
        this.belongsToTypeDataTwo = []
        this.belongsToTypeDataThree = []
        return false
      }
      this.searchForm.belongsToType = this.searchForm.belongsToTypeOne
      this.listSysTypeById(this.searchForm.belongsToTypeOne).then(({ code, data, msg }) => {
        this.belongsToTypeDataTwo = data.lists
      })
    },
    belongsToTypeTwoHandler () {
      this.searchForm.belongsToTypeThree = ''
      this.searchForm.inquiryObj = ''
      if (!this.searchForm.belongsToTypeTwo) {
        this.searchForm.belongsToTypeTwo = ''
        this.belongsToTypeDataThree = []
        return false
      }
      this.searchForm.belongsToType = this.searchForm.belongsToTypeTwo
      this.findInquiryListByTypeId(this.searchForm.belongsToTypeTwo).then(({ code, data, msg }) => {
        this.belongsToTypeDataThree = data.lists
      })
    },
    belongsToTypeThreeHandler () {
      if (!this.searchForm.belongsToTypeThree) {
        this.searchForm.belongsToTypeThree = ''
        this.belongsToTypeDataThree = []
        return false
      }
      this.searchForm.inquiryObj = this.searchForm.belongsToTypeThree
    },
    belongsToCategoryHandler (value) {
      let belongsToCategory = []
      belongsToCategory = value.map((item) => {
        return item
      })
      this.belongsToCategory = belongsToCategory.pop()
    },
    // end
    closeHanlder () {
      this.ipc.send('close-template-add')
    },
    createEditorHandler (editor) {
      this.editor = editor
    },
    templateEditorComfirmHandler (data) {
      let globalArr = []
      let askreg = /[Ww]/
      let dataString = data.join('')
      let divideArr = dataString.split('W~')
      divideArr.shift()
      for (let k = 0; k < divideArr.length; k++) {
        let obj = {}
        let divideTwoArr = []
        let divideA = divideArr[k].split('D~')
        for (let q = 0; q < divideA.length; q++) {
          if (q === 0) {
            obj.question = divideA[q]
          } else {
            divideTwoArr.push(divideA[q])
            obj.answers = divideTwoArr
          }
        }
        obj.sort = k
        globalArr.push(obj)
      }
      this.save(globalArr)
    },
    templateEditorCancelHandler () {
      this.closeHanlder()
    }
  }
}
</script>
