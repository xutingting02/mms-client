import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Patients from '@/pages/Patients'
import Dashboard from '@/pages/Dashboard'
import AddPatient from '@/pages/AddPatient'
import Records from '@/pages/Records'
import AddRecord from '@/pages/AddRecord'
import Mediciens from '@/pages/Medicines'
import AddMedicien from '@/pages/AddMedicine'
import Purchase from '@/pages/Purchase'
import Sale from '@/pages/Sale'
import AddPurchase from '@/pages/AddPurchase'
import AddSale from '@/pages/AddSale'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/manage',
      component: Layout,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'patients',
          component: Patients
        },
        {
          path: 'addPatient',
          component: AddPatient
        },
        {
          path: 'addPatient/:id',
          component: AddPatient,
          props: true
        },
        {
          path: 'records',
          component: Records
        },
        {
          path: 'addRecord',
          component: AddRecord
        },
        {
          path: 'addRecord/:id',
          component: AddRecord,
          props: true
        },
        {
          path: 'medicines',
          component: Mediciens
        },
        {
          path: 'addMedicine',
          component: AddMedicien
        },
        {
          path: 'addMedicine/:id',
          component: AddMedicien,
          props: true
        },
        {
          path: 'purchase',
          component: Purchase
        },
        {
          path: 'addPurchase',
          component: AddPurchase
        },
        {
          path: 'addPurchase/:id',
          component: AddPurchase,
          props: true
        },
        {
          path: 'sale',
          component: Sale
        },
        {
          path: 'addSale',
          component: AddSale
        },
        {
          path: 'addSale/:id',
          component: AddSale,
          props: true
        }
      ]
    }
  ]
})
