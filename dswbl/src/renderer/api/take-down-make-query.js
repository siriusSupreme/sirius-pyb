import axios from './request'

export function listBlheaderByPage ({ pageSize, currentPage, searchName, typeId }) {
  return axios({
    method: 'POST',
    url: '/BlHeaderRpc/listBlheaderByPage',
    data: {
      limit: pageSize,
      page: currentPage,
      serachName: searchName,
      typeId
    },
    contentType: 'json'
  })
}

export function listAllSysType () {
  return axios({
    method: 'GET',
    url: '/SysDataRpc/listAllSysType',
  })
}
