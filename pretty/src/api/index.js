import request from '@/utils/request'

export function getCabinetListsByUserId (userId) {
  return request({
    method: 'get',
    url: '/RoomRpc/listUserCupboardCells.json',
    params: {userId}
  })
}

export function storeDossierByCellId (cellId) {
  return request({
    method: 'get',
    url: '/RoomRpc/addCaseCell.json',
    params: {cellId}
  })
}

export function fetchDossierByDossierId (caseId) {
  return request({
    method: 'get',
    url: '/RoomRpc/takeCase.json',
    params: {caseId}
  })
}

export function getDossierListsByCellId (cellId) {
  return request({
    method: 'get',
    url: '/RoomRpc/listAllCaseByCellId.json',
    params: {cellId}
  })
}

export function searchCabinet (userId, caseNo) {
  return request({
    method: 'get',
    url: '/RoomRpc/listUserCaseCell.json',
    params: {userId, caseNo}
  })
}
