import Fly from 'flyio/dist/npm/wx'

const flyio = new Fly;
export const Http_URL = 'https://wenzhai.ichangbanmini.com/api/';
export const Http_WWW = 'https://wenzhai.ichangbanmini.com/';

// ajax
export function ajaxData (conf){
  wx.showLoading({
    title: '加载中',
    mask:true
  });
  conf.type = conf.type ? conf.type : 'post';
  // conf.data.userType = conf.data.userType?conf.data.userType:false;
  // conf.data.sign = user.sign;
  // if(!conf.data.userType){
  //   conf.data.user_id = user.id;
  // }
  flyio.request(Http_URL + conf.url, conf.data, {
    method: conf.type
  }).then(res=>{
    wx.hideLoading();
    conf.callback(res.data);
  }).catch(err=>{
    console.log(err,'错误')
    wx.hideLoading();
    // wx.showToast({
    //   title: '请求失败！',
    //   icon: 'none',
    //   duration: 2000
    // })
  })
}
//登录
export function signIn(res,callbackData) {
  wx.login({
    success: function (conf) {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      let userInfo ={};
      userInfo.headimgurl = res.userInfo.avatarUrl;
      userInfo.nickname = res.userInfo.nickName; 
      userInfo.iv = res.iv;
      userInfo.encryptedData = res.encryptedData;
      ajaxData({
        url: 'user/wechatLoginMiniProgram',
        data:{
          code:conf.code,
          headimgurl: res.userInfo.avatarUrl,
          nickname :res.userInfo.nickName,
          iv: res.iv,
          encryptedData: res.encryptedData,
        },
        callback: function (data) {
          wx.setStorageSync('userData', data.data);
          callbackData.callback();
        }
      })
    },
    fail: function (res) {
      localStorage.setItem("data",'');
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      });
    }
  });
}

export default {
  Http_URL,
  Http_WWW,
  signIn,
  ajaxData
}
