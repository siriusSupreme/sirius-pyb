import axios from './request'

export function listTemplateByPage ({ pageSize, currentPage, templateType, searchName, caseCause, typeCode, belongsToCategory, unit, shareStatus, inquiryObj }) {
  return axios({
    method: 'POST',
    url: '/TemplateRpc/listTemplateByPage',
    data: {
      limit: pageSize,
      page: currentPage,
      index: templateType,
      templateName: searchName,
      caseMsg: caseCause,
      typeCode,
      category: belongsToCategory,
      unitNo: unit,
      isShare: shareStatus,
      inquiryObj
    },
    contentType: 'json'
  })
}

export function findInquiryListByTypeId (id) {
  return axios({
    method: 'GET',
    url: '/SysDataRpc/findInquiryListByTypeId',
    params: {
      id
    }
  })
}

export function listCaseMsgParam (query) {
  return axios({
    method: 'GET',
    url: '/SysDataRpc/listCaseMsgParam',
    params: {
      nameOrType: query
    }
  })
}

export function listSysTypeById (id) {
  return axios({
    method: 'GET',
    url: '/SysDataRpc/listSysTypeById',
    params: {
      id
    }
  })
}

export function listCategoryByPage () {
  return axios({
    method: 'POST',
    url: '/SysDataRpc/listCategoryByPage',
    data: {
      code: "",
      id: "",
      name: ""
    },
    contentType: 'json'
  })
}

export function selectAllOrg () {
  return axios({
    method: 'POST',
    url: '/OrgRpc/selectAllOrg',
  })
}

export function save ({ templateName, inquiryObj, belongsToType, belongsToCategory, caseCause, id, templateData }) {
  return axios({
    method: 'POST',
    url: '/TemplateRpc/save',
    data: {
      attribute: 1,
      name: templateName,
      caseMsg: caseCause,
      category: belongsToCategory,
      id,
      inquiryObj: inquiryObj,
      isShare: "N",
      templateLineVos: templateData,
      type: belongsToType
    },
    contentType: 'json'
  })
}

export function findDetailById (id) {
  return axios({
    method: 'GET',
    url: '/TemplateRpc/findDetailById',
    params: {
      id
    }
  })
}
