import http from './http'

const SALE_LIST_URL = '/sale/list'
const DELETE_SALE_URL = '/sale/delete'
const ADD_SALE_URL = '/sale/add'
const GET_SALE_URL = '/sale/get'

export const getSaleList = (params) => {
  return http.fetchGet(SALE_LIST_URL, {params: params})
}

export const deleteSale = (params) => {
  return http.fetchPost(DELETE_SALE_URL, params)
}

export const addSale = (params) => {
  return http.fetchPost(ADD_SALE_URL, params)
}

export const getSaleById = (params) => {
  return http.fetchGet(GET_SALE_URL, {params: params})
}
