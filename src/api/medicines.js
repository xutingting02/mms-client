import http from './http'

const MEDICINE_LIST_URL = '/medicines/list'
const DELETE_MEDICINE_URL = '/medicines/delete'
const ADD_MEDICINE_URL = '/medicines/add'
const GET_MEDICINE_URL = '/medicines/get'

export const getMedicineList = (params) => {
  return http.fetchGet(MEDICINE_LIST_URL, {params: params})
}

export const deleteMedicine = (params) => {
  return http.fetchPost(DELETE_MEDICINE_URL, params)
}

export const addMedicine = (params) => {
  return http.fetchPost(ADD_MEDICINE_URL, params)
}

export const getMedicineById = (params) => {
  return http.fetchGet(GET_MEDICINE_URL, {params: params})
}
