/*
 * @Description: 
 * @Author: xtt
 * @Date: 2020-10-13 09:23:28
 * @LastEditors: xtt
 * @LastEditTime: 2020-10-20 19:24:38
 */
const login = require('../mock/login.json')
const patientsList = require('../mock/patientsList.json')
const deletePatient = require('../mock/deletePatient.json')
const addPatient = require('../mock/addPatient.json')
const getPatientById = require('../mock/getPatientById.json')
const recordsList = require('../mock/recordsList.json')
const addRecord = require('../mock/addRecord.json')
const deleteRecord = require('../mock/deleteRecord.json')
const getRecordById = require('../mock/getRecordById.json')
const getIncome = require('../mock/getIncome.json')

const medicineList = require('../mock/medicineList.json')
const deleteMedicine = require('../mock/deleteMedicine.json')
const addMedicine = require('../mock/addMedicine.json')
const getMedicineById = require('../mock/getMedicineById.json')

const purchaseList = require('../mock/purchaseList.json')
const deletePurchase = require('../mock/deletePurchase.json')
const addPurchase = require('../mock/addPurchase.json')
const getPurchaseById = require('../mock/getPurchaseById.json')

const saleList = require('../mock/saleList.json')
const deleteSale = require('../mock/deleteSale.json')
const addSale = require('../mock/addSale.json')
const getSaleById = require('../mock/getSaleById.json')

function Mock (app) {
  app.post('/auth/login', function (req, res) {
    res.json(login)
  })

  app.get('/patients/list', function (req, res) {
    res.json(patientsList)
  })

  app.get('/patients/get', function (req, res) {
    res.json(getPatientById)
  })

  app.post('/patients/delete', function (req, res) {
    res.json(deletePatient)
  })

  app.post('/patients/add', function (req, res) {
    res.json(addPatient)
  })

  app.get('/records/list', function (req, res) {
    res.json(recordsList)
  })

  app.post('/records/delete', function (req, res) {
    res.json(deleteRecord)
  })

  app.post('/records/add', function (req, res) {
    res.json(addRecord)
  })

  app.get('/records/get', function (req, res) {
    res.json(getRecordById)
  })

  app.post('/report/income', function (req, res) {
    res.json(getIncome)
  })


  app.get('/medicines/list', function (req, res) {
    res.json(medicineList)
  })

  app.post('/medicines/delete', function (req, res) {
    res.json(deleteMedicine)
  })

  app.post('/medicines/add', function (req, res) {
    res.json(addMedicine)
  })

  app.get('/medicines/get', function (req, res) {
    res.json(getMedicineById)
  })


  app.get('/purchase/list', function (req, res) {
    res.json(purchaseList)
  })

  app.post('/purchase/delete', function (req, res) {
    res.json(deletePurchase)
  })

  app.post('/purchase/add', function (req, res) {
    res.json(addPurchase)
  })

  app.get('/purchase/get', function (req, res) {
    res.json(getPurchaseById)
  })

  app.get('/sale/list', function (req, res) {
    res.json(saleList)
  })

  app.post('/sale/delete', function (req, res) {
    res.json(deleteSale)
  })

  app.post('/sale/add', function (req, res) {
    res.json(addSale)
  })

  app.get('/sale/get', function (req, res) {
    res.json(getSaleById)
  })
}

module.exports = Mock
