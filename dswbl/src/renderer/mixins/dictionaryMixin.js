import {
  getDictionaryListsByTypeAndCode
} from '@/api/common-api'

export default {
  methods: {
    getDictionaryListsByTypeAndCode (type, code, mapField = '', dictionaryField = '', isShowAll = true) {
      return getDictionaryListsByTypeAndCode({
        type,
        code,
        isShowAll
      }).then(dictionaries => {
        if (dictionaryField) this[dictionaryField] = dictionaries

        if (mapField) this.generateDictionaryMap(mapField, dictionaries)
      }).catch(error => {
        this.$message.error(error.message)
        return Promise.reject(error)
      })
    },
    generateDictionaryMap (mapField, dictionaries) {
      let dictionaryMap = {}

      dictionaries.forEach(dictionary => {
        dictionaryMap[dictionary.code] = dictionary.name
      })

      this[mapField] = dictionaryMap
    }
  }
}
