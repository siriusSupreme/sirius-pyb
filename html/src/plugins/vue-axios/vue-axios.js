import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({});

if ( process.env === 'production' ) {
  axiosInstance.defaults.baseURL = ''
}
