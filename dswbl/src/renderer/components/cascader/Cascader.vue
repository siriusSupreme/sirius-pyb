<template>
  <el-cascader v-model="cascaderValue" v-bind="$attrs" v-on="$listeners" :options="options" :props="props" :change-on-select="changeOnSelect" :placeholder="placeholder"></el-cascader>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    changeOnSelect: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {

    }
  },
  computed: {
    cascaderValue: {
      get () {
        return modelValue
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    initOptionsHandler () {
      let arr = []
      let options = JSON.parse(JSON.stringify(this.options))
      const handler = (item, globalArr, globalObj) => {
        if (!Array.isArray(item)) {
          item = Array.from(item)
        }
        for (let i = 0; i < item.length; i++) {
          let option = item[i]
          for (let key in option) {
            if (Array.isArray(option[key])) {
              if (option[key].length) {
                handler(option[key], globalObj.children, {})
              }
              globalObj.children = option[key]
            } else {
              globalObj[key] = option[key]
            }
          }
          globalArr.push(globalObj)
        }
        console.log(globalArr)
      }
      handler(options, [], {})
      // console.log()
    },
    searchHandler () {
      let arr = this.options
      let valueArr = []
      const handler = (children, id) => {
        if (children.id === id) {
          if (children.pid) {
            for (let k = 0; k < arr.length; k++) {
              handler(arr[k], pid)
            }
          }
          valueArr.push(id)
        } else {
          if (children.children && children.children.length) {
            for (let u = 0; u < children.children.length; u++) {
              handler(children.children)
            }
          }
        }
      }
      handler(arr, id)
      for (let i = 0; i < arr.length; i++) {
        handler(arr[i], id)
      }
    }
  }
}
</script>
