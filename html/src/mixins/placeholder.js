
function placeholderFixed (element) {
  const val = element.value
  const placeholder = element.getAttribute('placeholder')
  console.log(val + ' === ' + placeholder)

  if (val === '') {
    // 初始化
    element.value = placeholder
    element.className += ' dsw-placeholder-fixed'
  } else if (val === placeholder) {
    // 获取焦点
    element.value = ''
    element.className = element.className.replace(/\s+dsw-placeholder-fixed\s*/, ' ')
  }
}

export default {
  mounted () {
    const IE = navigator.userAgent.match(/msie[\s/]*(\d+(\.\d+)+)/i)

    if (IE && IE[1] <= 9) {
      this.$nextTick(() => {
        Array.from(document.querySelectorAll('input[placeholder], text[placeholder]'), (element, index) => {
          placeholderFixed(element)

          element.addEventListener('focus', function (e) {
            // placeholderFixed(this)
            const val = this.value
            const placeholder = this.getAttribute('placeholder')

            if (val === placeholder) {
              // 获取焦点
              this.value = ''
              this.className = this.className.replace(/\s+dsw-placeholder-fixed\s*/, ' ')
            }
          })
          element.addEventListener('blur', function (e) {
            // placeholderFixed(this)
            const val = this.value
            const placeholder = this.getAttribute('placeholder')

            if (val === '') {
              // 初始化
              this.value = placeholder
              this.className += ' dsw-placeholder-fixed'
            }
          })
        })
      })
    }
  }
}
