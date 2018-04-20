import Vue from 'vue'

import axios from './axios'

const https = axios

Vue.prototype.$https = https

export default https
