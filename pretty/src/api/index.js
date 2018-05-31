import request from '@/utils/request'

export function getCabinetLists (userId) {
  return request({
    method: 'get',
    url: '/RoomRpc/listUserCupboardCells.json',
    params: {userId}
  })
}

export function storeDossier (cellId) {
  return request({
    method: 'get',
    url: '/RoomRpc/listAllCaseByCellId.json',
    params: {cellId}
  })
}

export function fetchDossier () {
  return request({
    method: 'get',
    url: '/RoomRpc/listAllCaseByCellId.json'
  })
}

export function getDossierLists (cellId) {
  return request({
    method: 'get',
    url: '/RoomRpc/listAllCaseByCellId.json',
    params: {cellId}
  })
}

export function searchCabinet (data) {
  return request({
    method: 'get',
    url: '',
    params: data
  })
}
