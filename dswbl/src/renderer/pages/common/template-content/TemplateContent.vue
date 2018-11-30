<template>
  <div id="template-content" v-bind="$attrs" v-on="$listeners">
    <div class="template-content-tab-wrapper">
      <button type="button" class="template-content-tab-button" @click="tabHandler('ADD')" v-show="asideName === 'PERSONALTEMPLATE'">添加</button>
      <button type="button" class="template-content-tab-button" @click="tabHandler('AMEND')" v-show="asideName === 'PERSONALTEMPLATE'">修改</button>
      <button type="button" class="template-content-tab-button" @click="tabHandler('DELETE')" v-show="asideName === 'PERSONALTEMPLATE'">删除</button>
      <button type="button" class="template-content-tab-button" @click="tabHandler('SHARE')" v-show="asideName === 'PERSONALTEMPLATE'">分享</button>
      <button type="button" class="template-content-tab-button" @click="tabHandler('CANCELSHARE')" v-show="asideName === 'PERSONALTEMPLATE'">取消分享</button>
      <button type="button" class="template-content-tab-button" @click="tabHandler('COLLECT')" v-show="asideName === 'COMMONTEMPLATE' || asideName === 'SHARE' || asideName === 'PERSONALTEMPLATE'">收藏</button>
      <button type="button" class="template-content-tab-button" @click="tabHandler('CANCELCOLLECT')" v-show="asideName === 'COMMONTEMPLATE' || asideName === 'SHARE' || asideName === 'COLLENTIONTEMPLATE' || asideName === 'PERSONALTEMPLATE'">取消收藏</button>
    </div>
    <div class="template-content-search-wrapper">
      <el-form inline :model="searchForm" ref="searchForm" label-width="80px" class="searchForm">
        <el-form-item label="模板名称:" prop="templateName">
          <el-input v-model="searchForm.templateName" placeholder="输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="所属类型:" prop="belongsToType">
          <select v-model="searchForm.belongsToTypeOne" placeholder="请选择" class="searchForm-belongs-select" @change="belongsToTypeOneHandler">
            <option value="" selected>请选择</option>
            <option
              v-for="item in belongsToTypeDataOne"
              :key="item.id"
              :value="item.id">
              {{item.name}}
            </option>
          </select>
          <select v-model="searchForm.belongsToTypeTwo" placeholder="请选择" class="searchForm-belongs-selectt" @change="belongsToTypeTwoHandler">
            <option value="" selected>请选择</option>
            <option
              v-for="item in belongsToTypeDataTwo"
              :key="item.id"
              :value="item.id">
              {{item.name}}
            </option>
          </select>
          <select v-model="searchForm.belongsToTypeThree" placeholder="请选择" class="searchForm-belongs-select">
            <option value="" selected>请选择</option>
            <option
              v-for="item in belongsToTypeDataThree"
              :key="item.id"
              :value="item.id">
              {{item.name}}
            </option>
          </select>
        </el-form-item>
        <el-form-item label="案由:" prop="caseCause">
          <bl-select v-model="searchForm.caseCause" :remote="true" :key-map="{ label: 'name', value: 'id' }" :url="'/SysDataRpc/listCaseMsgParam'"></bl-select>
        </el-form-item>
        <el-form-item label="所属类别:" prop="belongsToCategory">
          <el-cascader :options="belongsToCategoryData" :props="belongsToCaegoryProps" change-on-select v-model="searchForm.belongsToCategory" @change="belongsToCategoryHandler" placeholder="选择所属类别" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="所属单位:" prop="unit" v-show="asideName === 'COLLENTIONTEMPLATE' || asideName === 'PERSONALTEMPLATE'">
          <el-cascader :options="unitData" :props="unitProps" change-on-select v-model="searchForm.unit" @change="unitHandler" placeholder="选择所属单位" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="分享状态:" prop="shareStatus" v-show="asideName === 'COLLENTIONTEMPLATE' || asideName === 'PERSONALTEMPLATE'">
          <el-select v-model="searchForm.shareStatus" placeholder="请选择" class="searchForm-share-status-select">
            <el-option
              v-for="item in shareStatusData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="search-form-placeholder" v-show="asideName !== 'COLLENTIONTEMPLATE' && asideName !== 'PERSONALTEMPLATE'"></div>
        <el-form-item>
          <button type="button" class="search-form-search-button" @click="serachHandler">查询</button>
          <button type="button" class="search-form-reset-button" @click="resetHandler('searchForm')">清空</button>
        </el-form-item>
      </el-form>
    </div>
    <div class="template-content-table-wraper">
      <el-table
        :data="templateTableData"
        height="460"
        style="width: 100%"
        align="center"
        header-align="center"
        highlight-current-row
        @row-dblclick="rowDblClickHandler"
        @current-change="currentChangeHandler"
        :row-class-name="tableRowClassName">
        <el-table-column
          type="index"
          :index="(index) => (pageSize * (currentPage - 1) + index + 1)"
          label="序号"
          width="50"
          align='center'
          header-align='center'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="模板类型"
          width="100"
          align='center'
          header-align='center'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="category"
          label="模板类别"
          width="100"
          align='center'
          header-align='center'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="caseMsg"
          label="案由名称"
          width="110"
          align='center'
          header-align='center'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="模板名称"
          width="320"
          align='center'
          header-align='center'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="producer"
          label="制作人"
          width="100"
          align='center'
          header-align='center'
          show-overflow-tooltip
          v-if="asideName === 'COLLENTIONTEMPLATE'">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="所属单位"
          align='center'
          width="100"
          header-align='center'
          show-overflow-tooltip
          v-if="asideName !== 'COMMONTEMPLATE'">
          <template slot-scope="{ row }">
            {{row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          prop="produceTime"
          label="制作时间"
          align='center'
          width="100"
          header-align='center'
          value-format='yyyy-MM-dd'
          show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{row.produceTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="分享状态"
          align='center'
          header-align='center'
          show-overflow-tooltip
          v-if="(asideName === 'COLLENTIONTEMPLATE' || asideName === 'PERSONALTEMPLATE')">
        </el-table-column>
        <el-table-column
          prop="address"
          label=""
          align='center'
          width="50"
          header-align='center'
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="template-content-table-pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '@/utils/formatDate'
import { listTemplateByPage, findInquiryListByTypeId, listCaseMsgParam, listSysTypeById, listCategoryByPage, selectAllOrg } from '@/api/template-manage'
export default {
  inheritAttrs: false,
  props: {
    asideName: {
      type: String,
      default: 'COMMONTEMPLATE'
    },
    templateType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      searchForm: {
        templateName: '',
        belongsToTypeOne: '',
        belongsToTypeTwo: '',
        belongsToTypeThree: '',
        belongsToType: '',
        caseCause: '',
        belongsToCategory: [],
        unit: [],
        shareStatus: ''
      },
      unit: '',
      belongsToCategory: '',
      belongsToTypeDataOne: [],
      belongsToTypeDataTwo: [],
      belongsToTypeDataThree: [],
      belongsToCategoryData: [],
      belongsToCaegoryProps: {
        label: 'name',
        value: 'id',
        children: 'categoryDos'
      },
      caseCauseOptionData: [],
      unitData: [],
      unitProps: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
      shareStatusData: [
        { label: '全部', value: '' },
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' }
      ],

      currentPage: 1,
      pageSize: 20,
      total: 0,
      templateTableData: [],
      templateId: 0
    }
  },
  filters: {
    formatDate (time) {
      if (time) {
        return formatDate(new Date(time), 'yyyy-MM-dd')
      } else {
        return ''
      }
    }
  },
  watch: {
    templateType (val, old) {
      const handler = () => {
        for (let key in this.searchForm) {
          if (key === 'belongsToCategory' || key === 'unit') {
            this.searchForm[key] = []
          } else {
            this.searchForm[key] = ''
          }
        }
        this.belongsToCategory = ''
        this.unit = ''
        this.templateId = 0
      }
      handler()
      this.listTemplateByPage()
    }
  },
  created () {
    this.ipc = this.$electron.ipcRenderer
    this.listSysTypeById(0).then(({ code, data, msg }) => {
      this.belongsToTypeDataOne = data.lists
    })
    this.ipc.on('update-template-content', () => {
      this.listTemplateByPage()
    })
    this.listTemplateByPage()
    this.listCategoryByPage()
    this.selectAllOrg()
  },
  mixins: [window.$blMixins.dictionaryMixin],
  methods: {
    listTemplateByPage () {
      if (Array.isArray(this.searchForm.caseCause)) {
        this.searchForm.caseCause = ''
      }
      if (this.searchForm.belongsToTypeThree) {
        this.searchForm.belongsToType = this.searchForm.belongsToTypeThree
      }  if (this.searchForm.belongsToTypeTwo) {
        this.searchForm.belongsToType = this.searchForm.belongsToTypeTwo
      } else if (this.searchForm.belongsToTypeOne) {
        this.searchForm.belongsToType = this.searchForm.belongsToTypeOne
      } else {
        this.searchForm.belongsToType = ''
      }
      return listTemplateByPage({ pageSize: this.pageSize, currentPage: this.currentPage, templateType: this.templateType,searchName: this.searchForm.templateName, caseCause: this.searchForm.caseCause, typeCode: this.searchForm.belongsToType, belongsToCategory: this.belongsToCategory, unit: this.unit, shareStatus: this.searchForm.shareStatus, inquiryObj: this.searchForm.belongsToTypeThree }).then(({code, data, msg}) => {
        this.templateTableData = data.lists
        this.total = data.pageDto.total
      })
    },
    findInquiryListByTypeId (id) {
      return findInquiryListByTypeId(id)
    },
    listCaseMsgParam () {
      return listCaseMsgParam(this.searchForm.caseCause).then(({ code, data, msg }) => {
        console.log(data)
      })
    },
    listSysTypeById (id) {
      return listSysTypeById(id)
    },
    listCategoryByPage () {
      return listCategoryByPage().then(({code, data, msg}) => {
        this.belongsToCategoryData = data.lists
      })
    },
    selectAllOrg () {
      return selectAllOrg().then(({code, data, msg}) => {
        this.unitData = data.lists
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
      this.searchForm.belongsToType = this.searchForm.belongsToTypeThree
    },
    belongsToCategoryHandler (value) {
      let belongsToCategory = []
      belongsToCategory = value.map((item) => {
        return item
      })
      this.belongsToCategory = belongsToCategory.pop()
    },
    remoteMethod (query) {
      this.listCaseMsgParam()
    },
    unitHandler (value) {
      let unit = []
      unit = value.map((item) => {
        return item
      })
      this.unit = unit.pop()
    },
    serachHandler () {
      this.listTemplateByPage()
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) return 'even'
      else return 'odd'
    },
    rowDblClickHandler (row) {
      console.log(row)
    },
    currentChangeHandler (currentRow) {
      if (!currentRow) return
      this.templateId = currentRow.id
    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this.listTemplateByPage()
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.listTemplateByPage()
    },
    resetHandler (formName) {
      this.$refs[formName].resetFields();
      this.searchForm.belongsToType = ''
      this.searchForm.belongsToTypeOne = ''
      this.searchForm.belongsToTypeTwo = ''
      this.searchForm.belongsToTypeThree = ''
      this.listTemplateByPage()
    },
    addHandler () {
      this.ipc.send('add-template')
    },
    amendHandler () {
      if (!this.templateId) return
      this.ipc.send('modifi-template', this.templateId)
    },
    tabHandler (flag) {
      switch (flag) {
        case 'ADD':
          this.addHandler()
          break
        case 'AMEND':
          this.amendHandler()
          break
      }
    }
  }
}
</script>
