import request from './request.js'

// 根据 ID 获取笔录类型列表
export function getTypeListsByPid( pid = 0 ) {
  return request( {
    method: 'GET',
    url: '/SysDataRpc/listSysTypeById',
    params: {
      id: pid
    }
  } )
}

// 根据笔录类型获取笔录询问对象列表
export function getInquiryListsByTypeId( typeId ) {
  return request( {
    method: 'GET',
    url: '/SysDataRpc/findInquiryListByTypeId',
    params: {
      id: typeId
    }
  } )
}


// 获取表单结构数据
export function getFormJsonData( module, moduleBizId ) {
  return request( {
    method: 'GET',
    url: '/SysDataRpc/getFormByModule',
    params: {
      module,
      moduleBizId
    }
  } )
}

// 获取表单数据
export function getFormData( blHeaderId ) {
  return request( {
    method: 'GET',
    url: '/BlHeaderRpc/getBlHeaderById',
    params: {
      blHeaderId
    }
  } )
}

// 保存表单数据
export function saveFormData( data ) {
  return request( {
    method: 'POST',
    url: '/BlHeaderRpc/saveModuleValue',
    contentType: 'json',
    data
  } )
}
