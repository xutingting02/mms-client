import http from './http'

const PURCHASE_LIST_URL = '/purchase/list'
const DELETE_PURCHASE_URL = '/purchase/delete'
const ADD_PURCHASE_URL = '/purchase/add'
const GET_PURCHASE_URL = '/purchase/get'

export const getPurchaseList = (params) => {
  return http.fetchGet(PURCHASE_LIST_URL, {params: params})
}

export const deletePurchase = (params) => {
  return http.fetchPost(DELETE_PURCHASE_URL, params)
}

export const addPurchase = (params) => {
  return http.fetchPost(ADD_PURCHASE_URL, params)
}

export const getPurchaseById = (params) => {
  return http.fetchGet(GET_PURCHASE_URL, {params: params})
}
