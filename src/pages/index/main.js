import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    "navigationBarTitleText": "首页",
    "backgroundColor": "#f8f8f8" ,
    "enablePullDownRefresh": true
  }
}
