<template>
  <div class="signInBtn" v-if="state == ''">
    <div class="bg"></div>
    <div class="content">
      <div class="tilte f-600 f-16 m-b-15">欢迎登录</div>
      <div class="">
        <button type="primary" size="mini" @getuserinfo="getuserinfoData($event)" open-type="getUserInfo">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
  import userInfo from "./userInfo";
  export default {
    name: "sign-in-btn",
    data(){
      return{
        state:'',
        userInfoId:''
      }
    },
    methods: {
      getuserinfoData(e){
        let _this = this;
        if(wx.getStorageSync('userData')!= ''){
          let userInfo = wx.getStorageSync('userData');
					that.userInfoId = userInfo.id;
          return;
        }
        let userInfo = null;
        userInfo = e.mp.detail;
        if (userInfo.errMsg.indexOf('fail') > 0) return;
        this.$signIn(userInfo, {
          callback: function () {
            _this.state = wx.getStorageSync('userData');
            if(wx.getStorageSync("options").scene == 1037){
              var optionidss = wx.getStorageSync("options").query.id;
              console.log(optionidss,'这是跳转的id')
              if(optionidss){
                wx.navigateTo({
                    url:'/pages/newsDetail/main?id='+optionidss
                })
              }
            }
            console.log('成功回调！')
          }
        });
      }
    },
    mounted(){
      this.state = wx.getStorageSync('userData');
    }
  }

</script>
<style lang="scss">
.signInBtn{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999999;
  .bg{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.4);
  }
  .content{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    min-width: 200px;
    text-align: center;
  }
}
</style>