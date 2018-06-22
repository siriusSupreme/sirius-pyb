import request from './request'

export function getCabinetListsByUserId (userId) {
  return request({
    method: 'get',
    url: '/RoomRpc/listUserCupboardCells.json',
    params: { userId }
  })
}

export function storeDossierByCellId (cellId, caseId) {
  return request({
    method: 'post',
    url: '/RoomRpc/addCaseCell.json',
    data: { cellId, caseId }
  })
}

export function getDossierInfoByCaseNo (caseNo) {
  return request({
    method: 'get',
    url: '/CaseHeaderRpc/queryByCode.json',
    params: { caseNo }
  })
}

export function fetchDossierByDossierId (cellId, caseId) {
  return request({
    method: 'post',
    url: '/RoomRpc/takeCase.json',
    data: { cellId, caseId }
  })
}

export function getDossierListsByCellId (cellId, caseNo) {
  return request({
    method: 'get',
    url: '/RoomRpc/listAllCaseByCellId.json',
    params: { cellId, caseNo }
  })
}

export function searchCabinet (userId, caseNo) {
  return request({
    method: 'get',
    url: '/RoomRpc/listUserCaseCell.json',
    params: { userId, caseNo }
  })
}
