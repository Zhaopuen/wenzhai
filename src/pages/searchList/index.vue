<template>
    <div class="index_container">
        <artical :audio_data="artical"></artical>
    </div>
</template>
<script>
import artical from '@/components/Article';
import userInfo from "../../components/userInfo";
export default {
      data () {
    return {
      artical: [],
      labelList: [],
      userInfoSign:null,
      label_arr: []
    }
  },
  computed:{

  },
  components:{
    artical
  },
  methods: {
    articleList(){
        let that = this;
        let userInfo = wx.getStorageSync('userData');
        this.$Http({
            url:'article/articleSearch',
            data:{
                user_id: userInfo.id,
                keyword: that.$root.$mp.query.keyword
            },
            callback :res=>{
                that.artical = res.data;
            },
        })
    },
  }, 
  mounted () {
    
  },
  onShow(){
    let that = this;
    that.label_arr = [];
    try {
      var value = wx.getStorageSync('label_arr');
      if (value) {
        that.label_arr = value;
      }
    } catch (e) {}
    that.artical = "";
    that.articleList();
    wx.showShareMenu();
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
}
</script>
<style>
.index_container{
  min-height:1030rpx;
  background:#f8f8f8;
  padding:20rpx;
}
.weui_artical_acolor{
  background:#fff;
  margin-bottom: 20rpx;
}
</style>

