import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:''
                                   });

if ( process.env === 'production' ) {
  axiosInstance.defaults.baseURL = ''
}


