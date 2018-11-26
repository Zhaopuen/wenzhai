import Vue from 'vue';

const userInfo = initUserInfo();

function initUserInfo() {
  const event = new Vue();
  let _userInfo = '',
    userInfo = {
      getUserInfo,
      setUserInfo
    };


      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                userInfo.setUserInfo(res.userInfo)
              },
              fail: () => {
              }
            })
          }
        }
      });


  function getUserInfo() {
    return new Promise((resolve, reject) => {
      if (_userInfo) {
        resolve(_userInfo);
        return;
      }
      let callback = userInfo => {
        event.$off('userInfoInit', callback)
        callback = null;
        resolve(userInfo);
      }
      event.$on('userInfoInit', callback);
    })
  }

  function setUserInfo(userInfo) {
    _userInfo = userInfo;
    event.$emit('userInfoInit', userInfo)
  }

  return userInfo;
}

Object.assign(Vue.prototype, userInfo);

export default userInfo;