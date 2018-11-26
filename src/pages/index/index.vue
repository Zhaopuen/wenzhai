<template>
  <div class="index_container">
    <artical :audio_data="artical"></artical>
    <div class="has_more">
      <div v-if="isShow" style="text-align:center;color:#666;">没有更多了...</div>
    </div>
  </div>
</template>
<script>
import artical from "@/components/Article";
import userInfo from "../../components/userInfo";
export default {
  data() {
    return {
      artical: [],
      labelList: [],
      userInfoSign: null,
      label_arr: [],
      hasMore: false,
      page: 0,
      totalPage: 5,
      isShow: false
    };
  },
  computed: {},
  components: {
    artical
  },
  

  methods: {
    articleList() {
      let that = this;
      // wx.showLoading({
      //   title: '玩命加载中',
      // })
      let userInfo = wx.getStorageSync("userData");
      this.$Http({
        url: "tag/setUserTag",
        data: {
          tag_ids: that.label_arr,
          user_id: userInfo.id
        },
        callback: res => {
          console.log(that.page,'nnnnnnnnn')
          this.$Http({
            // url:'article/getUserArticleList?page=' + that.page,
            url: "article/getUserArticleList",
            data: {
              user_id: userInfo.id,
              page: that.page
            },
            callback: res => {
              if (res.msg == "未找到相关文章") {
                wx.showToast({
                  title: "未找到相关文章!",
                  icon: "none",
                  duration: 1000
                });
                that.artical = "";
                return;
              }
              // let nowList = that.artical;
              // let addList = res.data;
              // nowList = nowList.concat(addList);
              // that.artical = nowList;
              // that.artical = res.data.replace(/&ldquo;/g,'"');
              that.artical = res.data;
              wx.stopPullDownRefresh();
              wx.hideNavigationBarLoading();
            }
          });
        }
      });
    },
    // 上拉加载
    articlePull: function(p) {
      console.log("yyyyyyyyyy")
      let that = this;
      let userInfo = wx.getStorageSync("userData");
      if (that.isShow) {
        return;
        console.log("");
      }
      this.$Http({
        url: "tag/setUserTag",
        data: {
          tag_ids: that.label_arr,
          user_id: userInfo.id
        },
        callback: res => {
          this.$Http({
            url: "article/getUserArticleList",
            data: {
              user_id: userInfo.id,
              page: p
            },
            callback: res => {
              let list = that.artical;
              let newList = list.concat(res.data);
              that.artical = newList;
              if (res.data.length < 10) {
                that.isShow = true;
              }
            }
          });
        }
      });
    },
    // 下拉刷新
    pullDown: function() {
      console.log("TTTTTTTTTTTTT")
      let that = this;
      let userInfo = wx.getStorageSync("userData");
      that.isShow = false;
      this.$Http({
        url: "tag/setUserTag",
        data: {
          tag_ids: that.label_arr,
          user_id: userInfo.id
        },
        callback: res => {
          this.$Http({
            url: "article/getUserArticleList",
            data: {
              user_id: userInfo.id,
              page: 1
            },
            callback: res => {
              that.artical = res.data;
            }
          });
        }
      });
    }
  },

  // 下拉刷新
  onPullDownRefresh: function(){
    console.log(88888)
    let that = this;
    that.pullDown();
  },
  // 上拉加载
  onReachBottom: function() {
    let that = this;
    let p = that.page;
    if (that.isShow) {
      return;
    }
    p++;
    that.articlePull(p);
    console.log(that.page++,'FFFFFFFFFF')
  },

  onLoad() {
    var that = this;
    that.label_arr = [];
    try {
      var value = wx.getStorageSync("label_arr");
      if (value) {
        that.label_arr = value;
      }
    } catch (e) {}
    that.articleList();
  },
  onShow() {
    let that = this;
    that.label_arr = [];
    try {
      var value = wx.getStorageSync("label_arr");
      if (value) {
        that.label_arr = value;
      }
    } catch (e) {}
    // that.articleList();
    wx.showShareMenu();
  }
};
</script>

<style scoped>
.index_container {
  min-height: 1030rpx;
  background: #f8f8f8;
  padding: 20rpx;
}
.weui_artical_acolor {
  background: #fff;
  margin-bottom: 20rpx;
}
</style>
