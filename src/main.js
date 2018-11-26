import Vue from 'vue'
import App from './App'
import utils from './utils'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

// 全局ajax
Vue.prototype.$Http = utils.ajaxData;

// 地址
// Vue.prototype.$Http_WWW = utils.Http_WWW
// api地址
Vue.prototype.$Http_URL = utils.Http_URL

//登录
Vue.prototype.$signIn = utils.signIn;

Vue.prototype.globalData = getApp().globalData

// 引入全局css
import '@/css/weui.css'
import '@/css/index.css'
import '@/font/icon/iconfont.css'

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // pages: ['pages/logs/main', '^pages/index/main'],
    pages: ['^pages/label/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#222',
      navigationBarTitleText: '首页',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true,
    },
    navigateToMiniProgramAppIdList:[
      "wxcbe110fu2xaxedfu",
      "wxfb1ff0f3u0abe913",
      "wxc1b5d81exdad1efe",
      "wxu8caa30cd32c1fb9",
      "wx52axxb89fx3xe23c"
    ],
    tabBar: {
      "color": "#bababa",
      selectedColor: "#000",
      borderStyle:'white',
      list: [{
        pagePath: "pages/index/main",
        text: "首页",
        iconPath: "./static/img/home_1.png",
        selectedIconPath: "./static/img/home_2.png"
      }, {
        pagePath: "pages/hotSearch/main",
        text: "热搜",
        iconPath: "./static/img/hot_1.png",
        selectedIconPath: "./static/img/hot_2.png"
      }, {
        pagePath: "pages/my/main",
        text: "我的",
        iconPath: "./static/img/my_1.png",
        selectedIconPath: "./static/img/my_2.png"
      }]
    }
  }
}
