/* eslint-disable */

if (!Date.prototype.format) {
  Date.prototype.format = function (formatter = 'yyyy-MM-dd HH:mm:ss') {
    const regExp = {
      '([yY]+)': String(this.getFullYear()),
      '(M+)': String(this.getMonth() + 1),
      '(d+)': String(this.getDate()),
      '(H+)': String(this.getHours()),
      '(m+)': String(this.getMinutes()),
      '(s+)': String(this.getSeconds()),
      '(q+)': String(Math.floor(this.getMonth() / 3) + 1),
      '(S+)': String(this.getMilliseconds())
    }

    if (/([yY]+)/.test(formatter)) {
      const len = Math.max(0, 4 - RegExp.$1.length)
      formatter = formatter.replace(RegExp.$1, regExp['([yY]+)'].substr(len))
    }

    for (let _regExp in regExp) {
      if ((new RegExp(_regExp)).test(formatter)) {
        formatter = formatter.replace(RegExp.$1, RegExp.$1.length > regExp[_regExp].length ? regExp[_regExp].padStart(4, '0').substr(-RegExp.$1.length) : regExp[_regExp])
      }
    }

    return formatter
  }
}
