/* eslint-disable */
/**
 * 获取浏览器类型以及版本号
 * 支持国产浏览器:猎豹浏览器、搜狗浏览器、傲游浏览器、360极速浏览器、360安全浏览器、QQ浏览器、百度浏览器等.
 * 支持国外浏览器:IE,Firefox,Chrome,safari,Opera等.
 * 使用方法:
 * 获取浏览器版本:Browser.client.version
 * 获取浏览器名称(外壳):Browser.client.name
 * @author: sirius
 * @since :2018-06-15
 **/
;(function webpackUniversalModuleDefinition(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory(global)
  } else if (typeof define === 'function' && define.amd) {
    define([global], factory)
  } else if (typeof exports === 'object') exports['Browser'] = factory(global)
  else global['Browser'] = factory(global)
})(window || this, function(global) {
  let document = global.document
  let navigator = global.navigator
  let agent = navigator.userAgent.toLowerCase()
  // IE8+支持.返回浏览器渲染当前文档所用的模式
  // IE6,IE7:undefined
  // IE8: 8(兼容模式返回7)
  // IE9: 9(兼容模式返回7 || 8)
  // IE10:10(兼容模式7||8||9)
  // IE11:11
  let IEMode = document.documentMode
  // chorme
  let chrome = global.chrome || false
  let system = {
    // user-agent
    agent: agent,
    // 是否为IE
    isIE: /msie/.test(agent),
    // Gecko内核
    isGecko: agent.indexOf('gecko') > 0 && agent.indexOf('like gecko') < 0,
    // webkit内核
    isWebkit: agent.indexOf('webkit') > 0,
    // 是否为标准模式
    isStrict: document.compatMode === 'CSS1Compat',
    // 是否支持subtitle
    supportSubTitle: function() {
      return 'track' in document.createElement('track')
    },
    // 是否支持scoped
    supportScope: function() {
      return 'scoped' in document.createElement('style')
    },
    // 获取IE的版本号
    ieVersion: function() {
      try {
        return agent.match(/msie\s+([\d.]+)/)[1] || 0
      } catch (e) {
        return IEMode
      }
    },
    // Opera版本号
    operaVersion: function() {
      try {
        if (global.opera) {
          return agent.match(/opera.([\d.]+)/)[1]
        } else if (agent.indexOf('opr') > 0) {
          return agent.match(/opr\/([\d.]+)/)[1]
        }
      } catch (e) {
        return 0
      }
    },
    // 描述:version过滤.如31.0.252.152 只保留31.0
    versionFilter: function() {
      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        let version = arguments[0]
        start = version.indexOf('.')
        if (start > 0) {
          end = version.indexOf('.', start + 1)
          if (end !== -1) {
            return version.substr(0, end)
          }
        }
        return version
      } else if (arguments.length === 1) {
        return arguments[0]
      }
      return 0
    }
  }

  try {
    // 浏览器类型(IE、Opera、Chrome、Safari、Firefox)
    system.type = system.isIE
      ? 'IE'
      : global.opera || agent.indexOf('opr') > 0
        ? 'Opera'
        : agent.indexOf('chrome') > 0
          ? 'Chrome'
          : // safari也提供了专门的判定方式
            global.openDatabase
            ? 'Safari'
            : agent.indexOf('firefox') > 0
              ? 'Firefox'
              : 'unknow'

    // 版本号
    system.version =
      system.type === 'IE'
        ? system.ieVersion()
        : system.type === 'Firefox'
          ? agent.match(/firefox\/([\d.]+)/)[1]
          : system.type === 'Chrome'
            ? agent.match(/chrome\/([\d.]+)/)[1]
            : system.type === 'Opera'
              ? system.operaVersion()
              : system.type === 'Safari'
                ? agent.match(/version\/([\d.]+)/)[1]
                : '0'

    // 浏览器外壳
    system.shell = function() {
      // 遨游浏览器
      if (agent.indexOf('maxthon') > 0) {
        system.version = agent.match(/maxthon\/([\d.]+)/)[1] || system.version
        return '傲游浏览器'
      }
      // QQ浏览器
      if (agent.indexOf('qqbrowser') > 0) {
        system.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || system.version
        return 'QQ浏览器'
      }

      // 搜狗浏览器
      if (agent.indexOf('se 2.x') > 0) {
        return '搜狗浏览器'
      }

      // Chrome:也可以使用window.chrome && window.chrome.webstore判断
      if (chrome && system.type !== 'Opera') {
        let external = global.external
        let clientInfo = global.clientInformation
        // 客户端语言:zh-cn,zh.360下面会返回undefined
        let clientLanguage = clientInfo.languages

        // 猎豹浏览器:或者agent.indexOf("lbbrowser")>0
        if (external && 'LiebaoGetVersion' in external) {
          return '猎豹浏览器'
        }
        // 百度浏览器
        if (agent.indexOf('bidubrowser') > 0) {
          system.version =
            agent.match(/bidubrowser\/([\d.]+)/)[1] ||
            agent.match(/chrome\/([\d.]+)/)[1]
          return '百度浏览器'
        }
        // 360极速浏览器和360安全浏览器
        if (system.supportSubTitle() && typeof clientLanguage === 'undefined') {
          // object.key()返回一个数组.包含可枚举属性和方法名称
          let storeKeyLen = Object.keys(chrome.webstore).length
          let v8Locale = 'v8Locale' in global
          return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器'
        }
        return 'Chrome'
      }
      return system.type
    }

    // 浏览器名称(如果是壳浏览器,则返回壳名称)
    system.name = system.shell()
    // 对版本号进行过滤过处理
    system.version = system.versionFilter(system.version)
  } catch (e) {}
  return {
    client: system
  }
})
