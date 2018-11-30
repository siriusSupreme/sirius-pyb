import axios from './request'

export async function getDictionaryListsByTypeAndCode ({
  type = '',
  code = '',
  isShowAll = true
} = {}) {
  try {
    let dictionaryKey = `Bl-${type}-${code}`
    let dictionary = window.localStorage.get(dictionaryKey)

    if (dictionary) {
      if (isShowAll) {
        if (dictionary[ 0 ].code !== '') {
          dictionary.unshift({
            code: '',
            name: '全部'
          })
        }
      } else if (dictionary[ 0 ].code === '') {
        dictionary.shift()
      }

      return dictionary
    }

    dictionary = await axios({
      method: 'GET',
      url: '/Dictionary/queryComboList',
      params: {
        type,
        code
      }
    })

    dictionary = dictionary.data.lists || []

    if (isShowAll) {
      dictionary.unshift({
        code: '',
        name: '全部'
      })
    }

    window.localStorage.set(dictionaryKey, dictionary)

    return dictionary
  } catch (e) {
    return Promise.reject(new Error(`获取字典失败：${type}: ${code}`))
  }
}
