import Vue from 'vue'
import axios from 'axios'

// eslint-disable-next-line
import Token from './Token'

const axiosInstance = axios.create({
  baseURL: ''
})

axiosInstance.interceptors.request.use((config) => {

})

axiosInstance.interceptors.response.use((response) => {

})

Vue.prototype.$axiosInstance = axiosInstance
