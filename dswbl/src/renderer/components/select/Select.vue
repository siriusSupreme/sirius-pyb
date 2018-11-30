<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    v-model="selectValue"
    :clearable="clearable"
    :filterable="filterable"
    :remote="remote"
    :reserve-keyword="reserveKeyword"
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :default-first-option="defaultFirstOption"
    :popper-append-to-body="popperAppendToBody"
    :automatic-dropdown="automaticDropdown">
    <template v-if="getObjectValue === false">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item[keyMap.label]"
        :value="item[keyMap.value]">
        <slot :item="item"></slot>
      </el-option>
    </template>
    <template v-else>
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item[keyMap.label]"
        :value="item">
        <slot :item="item"></slot>
      </el-option>
    </template>
  </el-select>
</template>

<script>
import axios from '@/api/request'
import { parse } from 'qs'
export default {
  inheritAttrs: false,
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: [Array, Object, Number, String],
      default: ''
    },
    request: {
      type: Function,
      default: () => {
        return axios
      }
    },
    isSelfRequest: {
      type: Boolean,
      default: false
    },
    method: {
      type: String,
      default: 'GET'
    },
    url: {
      type: String,
      default: '/SysDataRpc/listCaseMsgParam'
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    optionsData: {
      type: Array,
      default: () => {
        return []
      }
    },
    getObjectValue: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    remote: {
      type: Boolean,
      default: true
    },
    reserveKeyword: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    defaultFirstOption: {
      type: Boolean,
      default: true
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    automaticDropdown: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    keyMap: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        }
      }
    }
  },
  data () {
    return {
      handlerCaseCause: {},
      options: []
    }
  },
  computed: {
    selectValue: {
      get () {
        return this.modelValue
      },
      set (val) {
        return this.$emit('change', val)
      }
    }
  },
  created () {
    this.options = this.optionsData
  },
  methods: {
    remoteMethod (query) {
      if (query !== '' && this.remote) {
        this.requestHandler(query).then(({data}) => {
          this.options = data.lists
        })
      }
    },
    requestHandler (query = '') {
     return this.isSelfRequest ?
      this.request(params) :
      axios({
        method: this.method,
        url: this.url,
        params: {
          nameOrType: query
        }
      })
    }
  }
}
</script>
