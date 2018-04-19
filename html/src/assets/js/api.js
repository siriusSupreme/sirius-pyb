import Vue from 'vue'
import axios from 'axios'

// eslint-disable-next-line
import Token from './Token'

const axiosInstance = axios.create({
  baseURL: ''
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use((response) => {
  return response
})

Vue.prototype.$axiosInstance = axiosInstance
