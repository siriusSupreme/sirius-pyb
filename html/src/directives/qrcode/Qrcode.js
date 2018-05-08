
class Qrcode {
  constructor (vnode) {
    this.vnode = vnode
  }

  print () {
    const vnode = this.vnode

    const orgName = vnode.context.$data.currentRow.orgName
    const caseName = vnode.context.$data.currentRow.name
    const caseCode = vnode.context.$data.currentRow.caseNo
    const date = (new Date(vnode.context.$data.currentRow.regDate)).format()
    const pname = vnode.context.$data.currentRow.orgName
    const codeRemark = caseCode
    const type = 2

    const TSCObj = new window.ActiveXObject('TSCActiveX.TSCLIB')
    // TSCObj.ActiveXabout();
    // 连接打印机
    const i = TSCObj.ActiveXopenport('TSC TTP-244 Pro')
    if (i === 0) {
      return 0
    }
    const ulpcxLocation = 'C:\\atta\\UL.PCX'

    TSCObj.ActiveXdownloadpcx(ulpcxLocation, 'UL.PCX')
    // 清除缓存
    TSCObj.ActiveXsendcommand('CLS')
    // 设置打印机标签页宽度和高度 60*37
    TSCObj.ActiveXsetup('60', '37', '5', '15', '0', '2', '0')
    // TSCObj.ActiveXformfeed();
    // TSCObj.ActiveXnobackfeed();
    // 设置打印机标签页宽度和高度
    TSCObj.ActiveXsendcommand('GAP 3mm,0')
    // 定义标签纸上的相对于原点的参考点坐标
    TSCObj.ActiveXsendcommand('REFERENCE 0,0')
    // 该指令表示标签打印偏移量多少设置
    TSCObj.ActiveXsendcommand('SHIFT 0')
    TSCObj.ActiveXsendcommand('SET TEAR ON')
    // 清除上一次记录
    TSCObj.ActiveXclearbuffer()
    // TSCObj.ActiveXprinterfont('10','10','3','0','1','1','ActiveXdll Test!!');
    // TSCObj.ActiveXsendcommand('PUTPCX 10,200,\'UL.PCX\'');
    // TSCObj.ActiveXwindowsfont(x轴起始坐标, y轴起始左边, 字体大小, 0, 0, 0, '微软雅黑', 字体内容);
    TSCObj.ActiveXwindowsfont(15, 2, 40, 0, 0, 0, '微软雅黑', caseCode)
    TSCObj.ActiveXwindowsfont(15, 25, 35, 0, 0, 0, '微软雅黑', '——————————————————')

    if (caseName.length > 11) {
      let pCName = caseName.substring(0, 11)
      let lCName = caseName.substring(11)
      TSCObj.ActiveXwindowsfont(15, 50, 30, 0, 0, 0, '微软雅黑', '案件名称:' + pCName)
      TSCObj.ActiveXwindowsfont(15, 80, 30, 0, 0, 0, '微软雅黑', '        ' + lCName)

      TSCObj.ActiveXwindowsfont(15, 110, 30, 0, 0, 0, '微软雅黑', '主办民警:' + pname)
      TSCObj.ActiveXwindowsfont(15, 140, 30, 0, 0, 0, '微软雅黑', '主办单位:' + orgName)
      TSCObj.ActiveXwindowsfont(15, 170, 30, 0, 0, 0, '微软雅黑', '打印日期:' + date)
    } else {
      TSCObj.ActiveXwindowsfont(15, 50, 30, 0, 0, 0, '微软雅黑', '案件名称:' + caseName)

      TSCObj.ActiveXwindowsfont(15, 80, 30, 0, 0, 0, '微软雅黑', '主办民警:' + pname)
      TSCObj.ActiveXwindowsfont(15, 110, 30, 0, 0, 0, '微软雅黑', '主办单位:' + orgName)
      TSCObj.ActiveXwindowsfont(15, 140, 30, 0, 0, 0, '微软雅黑', '打印日期:' + date)
    }
    if (type === 1) {
      // 打印条形码
      TSCObj.ActiveXbarcode('15', '190', '128', '90', '0', '0', '2', '2', codeRemark)
    } else {
      // 打印二维码
      const command = 'QRCODE 350,80,L,5,A,0,M1,S3,\'' + codeRemark + '\''
      TSCObj.ActiveXsendcommand(command)
    }
    // 打印份数
    TSCObj.ActiveXprintlabel('1', '1')
    // 关闭连接
    TSCObj.ActiveXcloseport()

    return i
  }
}

export default Qrcode
