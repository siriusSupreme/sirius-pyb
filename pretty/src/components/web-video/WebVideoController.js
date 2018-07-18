import webVideo from '@/assets/vendors/web-video-ctrl/WebVideoCtrl.js'

// import {
//   GetHttpInfo,
//   GetSelectWndInfo,
//   KeyBoardEventInfo,
//   PluginEventHandler,
//   RemoteConfigInfo,
//   WebVideoCtrl,
//   WindowDblClick,
//   ZoomInfoCallback
// } from '@/assets/vendors/web-video-ctrl/WebVideoCtrl.js'

// import {
//   toJson,
//   toXml
// } from 'xml2json'

const WebVideoCtrl = webVideo.WebVideoCtrl

function toJson (xml) {
  return xml
}

function toXml (json) {
  return json
}

const SUCCESS_XML = Symbol('success-xml')
const SUCCESS_RESULT = Symbol('success-result')
const SUCCESS = Symbol('success')
const ERROR_XML = Symbol('error-xml')
const ERROR_RESULT = Symbol('error-result')
const ERROR = Symbol('error')

class WebVideoController {
  // IP 模式
  MODE_IP_DOMAIN = 0
  MODE_IP_SERVER = 1
  MODE_HID_DNS = 2
  // 码流类型
  STREAM_TYPE_MAIN = 1
  STREAM_TYPE_SUB = 2
  // 通道类型
  CHANNEL_TYPE_ZERO = 0
  CHANNEL_TYPE_ANALOG = 1
  CHANNEL_TYPE_DIGITAL = 2
  CHANNEL_TYPE_AUDIO = 3
  // 播放模式
  PLAY_MODE_REAL = 0
  PLAY_MODE_BACK = 1
  PLAY_MODE_REVERSE = 2
  // 窗口分割类型
  WND_TYPE_1_1 = 1
  WND_TYPE_2_2 = 2
  WND_TYPE_3_3 = 3
  WND_TYPE_4_4 = 4
  // 打开对话框，选择类型
  OPEN_FILE_TYPE_FILE = 1
  OPEN_FILE_TYPE_FOLDER = 0
  // 封装格式
  PACKAGE_TYPE_PS = 2
  PACKAGE_TYPE_MP4 = 11
  // 播放状态
  PLAY_STATUS_NONE = 0
  PLAY_STATUS_PREVIEW = 1
  PLAY_STATUS_BACK = 2
  PLAY_STATUS_PAUSE = 3
  PLAY_STATUS_FRAME = 4
  PLAY_STATUS_REVERSE = 5
  PLAY_STATUS_REVERSE_PAUSE = 6

  // 设备标识
  szDeviceIdentify = ''

  constructor (width = 500, height = 300, options = {}, autoInitialize = true) {
    this.webVideoCtrl = WebVideoCtrl

    if (autoInitialize === true) this.initialize(width, height, options)
  }

  initialize (width = 500, height = 300, options = {}) {
    return new Promise((resolve, reject) => {
      // 检查插件是否已经安装过
      switch (WebVideoCtrl.I_CheckPluginInstall()) {
        case -1:
        {
          alert(
            '您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！'
          )
          reject(
            new Error(
              '您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！'
            )
          )
          return
        }
        case -2:
        {
          alert('Chrome 浏览器版本过高，不支持 NPAPI！')
          reject(new Error('Chrome 浏览器版本过高，不支持 NPAPI！'))
          return
        }
        default:
        {}
      }

      let cbInitPluginComplete = options.cbInitPluginComplete

      options.cbInitPluginComplete = () => {
        if (WebVideoCtrl.I_InsertOBJECTPlugin(options.szContainerId) === -1) {
          alert('嵌入播放插件失败！')
          reject(new Error('嵌入播放插件失败！'))
          return
        }

        // 检查插件是否最新
        switch (WebVideoCtrl.I_CheckPluginVersion()) {
          case -1:
          {
            alert(
              '检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！'
            )
            // reject(
            //   new Error(
            //     '检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！'
            //   )
            // )
            break
          }
          case -2:
          {
            alert(
              '您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！'
            )
            reject(
              new Error(
                '您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！'
              )
            )
            return
          }
          default:
          {}
        }

        cbInitPluginComplete && cbInitPluginComplete(WebVideoCtrl)

        resolve(this)
      }

      // 初始化插件参数及插入插件
      WebVideoCtrl.I_InitPlugin(width, height, options)
    })
  }

  getIPInfoByMode ({
    iMode,
    szAddress,
    iPort,
    szDeviceInfo
  }) {
    let IPInfo = WebVideoCtrl.I_GetIPInfoByMode(
      iMode,
      szAddress,
      iPort,
      szDeviceInfo
    )
    return IPInfo === ''
      ? Promise.reject(new Error('获取设备 IP 失败'))
      : Promise.resolve(IPInfo)
  }

  login ({
    szIp,
    iProtocol,
    iPort,
    szUserName,
    szPassword,
    async = false,
    cgi
  }) {
    this.szDeviceIdentify = `${szIp}_${iPort}`

    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_login(szIp, iProtocol, iPort, szUserName, szPassword, {
        async,
        cgi,
        success: this[SUCCESS_XML](resolve),
        error: this[ERROR_XML](reject)
      })
    })
  }

  logout () {
    return WebVideoCtrl.I_logout(this.szDeviceIdentify) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('退出失败'))
  }

  getDeviceInfo (async = false) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_GetDeviceInfo(this.szDeviceIdentify, {
        async,
        success: this[SUCCESS_XML](resolve),
        error: this[ERROR_XML](reject)
      })
    })
  }

  // 通道相关
  getAnalogChannelInfo (async = false) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_GetAnalogChannelInfo(this.szDeviceIdentify, {
        async,
        success: this[SUCCESS_XML](resolve),
        error: this[ERROR_XML](reject)
      })
    })
  }
  getDigitalChannelInfo (async = false) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_GetDigitalChannelInfo(this.szDeviceIdentify, {
        async,
        success: this[SUCCESS_XML](resolve),
        error: this[ERROR_XML](reject)
      })
    })
  }
  getZeroChannelInfo (async = false) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_GetAnalogChannelInfo(this.szDeviceIdentify, {
        async,
        success: this[SUCCESS_XML](resolve),
        error: this[ERROR_XML](reject)
      })
    })
  }
  getAudioChannelInfo (async = false) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_GetAudioInfo(this.szDeviceIdentify, {
        async,
        success: this[SUCCESS_XML](resolve),
        error: this[ERROR_XML](reject)
      })
    })
  }

  getChannelInfo (channelType, async = false) {
    switch (channelType) {
      case this.CHANNEL_TYPE_ZERO:
      {
        return this.getZeroChannelInfo(async)
      }
      case this.CHANNEL_TYPE_ANALOG:
      {
        return this.getAnalogChannelInfo(async)
      }
      case this.CHANNEL_TYPE_DIGITAL:
      {
        return this.getDigitalChannelInfo(async)
      }
      case this.CHANNEL_TYPE_AUDIO:
      {
        return this.getAudioInfo(async)
      }
      default:
      {
        return Promise.reject(new Error('通道类型不合法'))
      }
    }
  }

  recordSearch ({
    iChannelID,
    szStartTime,
    szEndTime,
    iStreamType = this.STREAM_TYPE_MAIN,
    iSearchPos = 0,
    async = false
  }) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_RecordSearch(
        this.szDeviceIdentify,
        iChannelID,
        szStartTime,
        szEndTime, {
          async,
          iSearchPos,
          success: this[SUCCESS_XML](resolve),
          error: this[ERROR_XML](reject)
        }
      )
    })
  }

  getDevicePort () {
    let port = WebVideoCtrl.I_GetDevicePort(this.szDeviceIdentify)

    return port
      ? Promise.resolve(port)
      : Promise.reject(new Error('获取设备端口失败'))
  }

  startRealPlay ({
    iWndIndex = 0,
    iChannelID = 1,
    bZeroChannel = false,
    iPort,
    iStreamType = this.STREAM_TYPE_MAIN
  }) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_StartRealPlay(this.szDeviceIdentify, {
        iWndIndex,
        iChannelID,
        bZeroChannel,
        iPort,
        iStreamType,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  startPlayBack ({
    iWndIndex = 0,
    iChannelID = 1,
    iPort,
    szStartTime,
    szEndTime,
    iStreamType = this.STREAM_TYPE_MAIN,
    oTransCodeParam
  }) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_StartPlayBack(this.szDeviceIdentify, {
        iWndIndex,
        iChannelID,
        iPort,
        szStartTime,
        szEndTime,
        iStreamType,
        oTransCodeParam,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  reversePlayBack ({
    iWndIndex = 0,
    iChannelID = 1,
    iPort,
    szStartTime,
    szEndTime,
    iStreamType = this.STREAM_TYPE_MAIN
  }) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_ReversePlayBack(this.szDeviceIdentify, {
        iWndIndex,
        iChannelID,
        iPort,
        szStartTime,
        szEndTime,
        iStreamType,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  start (
    playMode,
    options = {
      iWndIndex: 0,
      iChannelID: 1,
      bZeroChannel: false,
      iPort: undefined,
      szStartTime: undefined,
      szEndTime: undefined,
      iStreamType: this.STREAM_TYPE_MAIN,
      oTransCodeParam: undefined
    }
  ) {
    switch (playMode) {
      case this.PLAY_MODE_REAL:
      {
        return this.startRealPlay(options)
      }
      case this.PLAY_MODE_BACK:
      {
        return this.startPlayBack(options)
      }
      case this.PLAY_MODE_REVERSE:
      {
        return this.reversePlayBack(options)
      }
      default:
      {
        return Promise.reject(new Error('播放模式不合法'))
      }
    }
  }

  stop (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_Stop({
        iWndIndex,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  frame (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_Frame({
        iWndIndex,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  pause (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_Pause({
        iWndIndex,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  resume (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_Resume({
        iWndIndex,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  playSlow (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_PlaySlow({
        iWndIndex,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  playFast (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_PlayFast({
        iWndIndex,
        success: this[SUCCESS](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  getOSDTime (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_GetOSDTime({
        iWndIndex,
        success: this[SUCCESS_RESULT](resolve),
        error: this[ERROR](reject)
      })
    })
  }

  openSound (iWndIndex) {
    return WebVideoCtrl.I_OpenSound(iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('打开声音失败'))
  }

  closeSound (iWndIndex) {
    return WebVideoCtrl.I_CloseSound(iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('关闭声音失败'))
  }

  setVolume (iVolume, iWndIndex) {
    return WebVideoCtrl.I_SetVolume(iVolume, iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('设置音量失败'))
  }

  capturePic (szPicName, bDateDir = true, iWndIndex) {
    return WebVideoCtrl.I_CapturePic(szPicName, {
      iWndIndex,
      bDateDir
    }) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('抓取图片失败'))
  }

  changeWndNum (WND_TYPE_1_1 = this.WND_TYPE_1_1) {
    return WebVideoCtrl.I_ChangeWndNum(WND_TYPE_1_1) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('画面分割失败'))
  }

  startRecord (szFileName, bDateDir = true, iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_StartRecord(szFileName, {
        iWndIndex,
        bDateDir,
        success: this[SUCCESS](),
        error: this[ERROR]
      })
    })
  }

  stopRecord (iWndIndex) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_StopRecord({
        iWndIndex,
        success: this[SUCCESS](),
        error: this[ERROR]
      })
    })
  }

  startDownloadRecord (szPlaybackURI, szFileName, bDateDir = true) {
    let id = WebVideoCtrl.I_StartDownloadRecord(
      this.szDeviceIdentify,
      szPlaybackURI,
      szFileName, {
        bDateDir
      }
    )

    return id === -1
      ? Promise.reject(new Error('启动下载失败'))
      : Promise.resolve(id)
  }

  getDownloadStatus (iDownloadID) {
    return WebVideoCtrl.I_GetDownloadStatus(iDownloadID) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('已经下载完成或者失败'))
  }

  getDownloadProgress (iDownloadID) {
    return WebVideoCtrl.I_GetDownloadProgress()(iDownloadID)
  }

  stopDownloadRecord (iDownloadID) {
    return WebVideoCtrl.I_StopDownloadRecord(iDownloadID) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('终止下载失败'))
  }

  startVoiceTalk (iAudioChannel) {
    return WebVideoCtrl.I_StartVoiceTalk(
      this.szDeviceIdentify,
      iAudioChannel
    ) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('开始语音对讲失败'))
  }

  stopVoiceTalk () {
    return WebVideoCtrl.I_StopVoiceTalk() === 0
      ? Promise.resolve()
      : Promise.reject(new Error('结束语音对讲失败'))
  }

  iPTZControl (iPTZIndex, bStop, iWndIndex, iPTZSpeed = 4) {
    WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
      iWndIndex,
      iPTZSpeed
    })
  }

  setPreset (iPresetID, iWndIndex) {
    WebVideoCtrl.I_SetPreset(iPresetID, {
      iWndIndex
    })
  }

  goPreset (iPresetID, iWndIndex) {
    WebVideoCtrl.I_GoPreset(iPresetID, {
      iWndIndex
    })
  }

  enableEZoom (iWndIndex) {
    return WebVideoCtrl.I_EnableEZoom(iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('开启电子放大失败'))
  }
  disableEZoom (iWndIndex) {
    return WebVideoCtrl.I_DisableEZoom(iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('禁用电子放大失败'))
  }

  enable3DZoom (iWndIndex) {
    return WebVideoCtrl.I_Enable3DZoom(iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('开启3D放大失败'))
  }
  disable3DZoom (iWndIndex) {
    return WebVideoCtrl.I_Disable3DZoom(iWndIndex) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('禁用3D放大失败'))
  }

  fullScreen (bFull) {
    WebVideoCtrl.I_FullScreen(bFull)
  }

  getLocalCfg () {
    let configXml = WebVideoCtrl.I_GetLocalCfg()

    return Promise.resolve(toJson(configXml))
  }

  setLocalCfg (szLocalCofing) {
    return WebVideoCtrl.I_SetLocalCf(toXml(szLocalCofing)) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('配置失败'))
  }

  getWindowStatus (iWndIndex) {
    let status = WebVideoCtrl.I_GetWindowStatus(iWndIndex)

    return status === null ? Promise.reject(new Error('获取播放窗口信息失败')) : Promise.resolve(status)
  }

  openFileDlg (iType = this.OPEN_FILE_TYPE_FILE) {
    let fileName = WebVideoCtrl.I_OpenFileDlg(iType)

    return Promise.resolve(fileName)
  }

  getLastError () {
    return WebVideoCtrl.I_GetLastError()
  }

  sendHTTPRequest ({
    szURI,
    type = 'GET',
    data,
    auth,
    async = true
  }) {
    return new Promise((resolve, reject) => {
      WebVideoCtrl.I_SendHTTPRequest(this.szDeviceIdentify, szURI, {
        async,
        type,
        data: toXml(data),
        auth,
        success: this[SUCCESS_XML],
        error: this[ERROR_XML]
      })
    })
  }

  setPackageType (iPackageType = this.PACKAGE_TYPE_MP4) {
    return WebVideoCtrl.I_SetPackageType(iPackageType) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('设置封装格式失败'))
  }

  deviceCapturePic (iChannelID, szPicName, bDateDir = true, iResolutionWidth, iResolutionHeight) {
    return WebVideoCtrl.I_DeviceCapturePic(
      this.szDeviceIdentify,
      iChannelID,
      szPicName, {
        bDateDir,
        iResolutionWidth,
        iResolutionHeight
      }
    ) === 0
      ? Promise.resolve()
      : Promise.reject(new Error('设备抓图失败'))
  }

  async destroy () {
    try {
      await this.getWindowStatus()
      await this.stop()
    } catch (e) {}

    await this.logout()
  }

  [SUCCESS_XML] (resolve) {
    return xmlDoc => {
      resolve({
        that: this,
        result: toJson(xmlDoc),
        xmlDoc
      })
    }
  }
  [SUCCESS_RESULT] (resolve) {
    return result => {
      resolve({
        that: this,
        result
      })
    }
  }
  [SUCCESS] (resolve) {
    return xmlDoc => {
      resolve({
        that: this
      })
    }
  }

  [ERROR_XML] (reject) {
    return (statusCode, xmlDoc) => {
      reject({
        that: this,
        statusCode,
        result: toJson(xmlDoc),
        xmlDoc
      })
    }
  }
  [ERROR_RESULT] (reject) {
    return result => {
      reject({
        that: this,
        result
      })
    }
  }
  [ERROR] (reject) {
    return () => {
      reject({
        that: this
      })
    }
  }
}

export default WebVideoController
