<template>
    <div class="weui_author_detail">
       <div class="weui_author_header">
           <div class="weui_author_headerback">
                <img src="../../../static/img/aback.png" alt="">
                <div class="weui_author_headerimg">
                    <img :src="http_url+authorAvatar" alt="">
                    <p>{{authorName}}</p>
                </div>
           </div>
           <div class="weui_author_huati">
                <ul class="weui_author_huatibox">
                    <li class="weui_author_huaticontent">
                        <p>{{authorCount}}</p>
                        <h5>文章</h5>
                    </li>
                    <li class="weui_author_huaticontent">
                        <p>{{authorComment}}</p>
                        <h5>回复</h5>
                    </li>
                    <li class="weui_author_huaticontent">
                        <p>{{authorZan}}</p>
                        <h5>点赞</h5>
                    </li>
                </ul>
                <div class="weui_author_star">
                    <div class="weui_author_staryellow" :class="{authorYellow:isShow}" @click="authorCollection">
                        <i class="iconfont icon-shangpinliebiaoshoucangx"></i>
                    </div>
                </div>
           </div>
           <div class="author_boxs">
                <div v-for="(item,index) in artical" :key="index">
                    <a :href="'/pages/newsDetail/main?id='+item.id">
                        <div class="weui_artical">
                            <div class="weui_articlebox">
                                <div class="weui_artical_titleleft">
                                    <img :src="http_url+authorAvatar" alt="" class="weui_artical_img">
                                    <span class="weui_artical_name">{{authorName}}</span>
                                </div>
                                <div class="weui_artical_time">{{item.create_time_text}}</div>
                            </div>  
                            <div class="weui_artical_imgbox">
                                <img :src="http_url+item.pic" alt="">
                            </div>
                            <div class="weui_artical_content">{{item.title}}</div>
                        </div>  
                    </a>
                </div>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        artical: [],
        authorName:'',    //作者名字
        authorAvatar:'',   //作者头像
        authorCount:'',   //文章数量
        authorZan:'',   //点赞数量
        authorComment:'',   //回复数量
        isShow:false,
        authorBox:[],
        http_url:'https://wenzhai.ichangbanmini.com',
      }
    },
    mounted(){
       this.authorDetail();
    },
    methods:{
        //作者详情
        authorDetail(){
            let that = this;
            let userInfo = wx.getStorageSync('userData');
            this.$Http({
                url:'author/detail',
                data:{
                   author_id:that.$root.$mp.query.id,
                   user_id:userInfo.id
                },
                callback:res=>{
                   that.authorName = res.date.name;
                   that.authorAvatar = res.date.avatar;
                   that.authorComment = res.date.comment_count;
                   that.authorCount = res.date.article_count;
                   that.authorZan = res.date.like_count;
                   that.artical = res.article;
                   console.log(res.date.is_col,that.isShow)
                   if(res.date.is_col == "1"){
                       that.isShow = true;
                   }else{
                       that.isShow = false;
                   }
                }
            })
        },
        // 作者收藏
        authorCollection(){
            let that = this;
            let userInfo = wx.getStorageSync('userData');
            that.userInfoSign = userInfo.sign;
            that.userInfoId = userInfo.id;
            that.$Http({
                url:'collection/add',
                data:{
                    user_id:that.userInfoId,
                    sign:that.userInfoSign,
                    id:that.$root.$mp.query.id,
                    type:1
                },
                callback:res=>{
                    if(res.msg == "收藏成功"){
                        that.isShow = true;
                        wx.showToast({
                            title: '收藏成功',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                    if(res.msg == "已取消收藏"){
                        that.isShow = false;
                        wx.showToast({
                            title:'您取消了收藏',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                    if(res == ""){
                        wx.showToast({
                            title: '收藏失败',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                }
            })
        },
    },
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    },
}
</script>
<style scoped>
.weui_author_detail{
    height:100%;
    background:#f8f8f8;
}
.author_boxs{
    padding:0 30rpx;
}
.weui_author_headerback{
    width:100%;
    height:480rpx;
    position: relative;
    display:flex;
    -webkit-align-items:center;
    align-items:center;
    -webkit-justify-content:center;
    justify-content:center;
    margin-bottom: 180rpx;
}
.weui_author_headerback img{
    width:100%;
}
.weui_author_headerimg{
    position: absolute;
}
.weui_author_headerimg img{
    width:180rpx;
    height:180rpx;
    border-radius:50%;
}
.weui_author_headerimg p{
    text-align: center;
    color:#fff;
}
.weui_author_huati{
    width:680rpx;
    height:240rpx;
    background:#fff;
    border-radius:18rpx;
    position: absolute;
    top:400rpx;
    z-index:888;
    left:35rpx;
    display:flex !important;
}
.weui_author_huatibox{
    padding:50rpx;
    width:100%;
    display:flex !important;
}
.weui_author_huaticontent{
    width:33.3%;
    margin:0 auto;
}
.weui_author_huaticontent p{
    font-size: 42rpx;
    color:#000;
    font-weight: bold;
    display:flex !important;
    justify-content: center;
}
.weui_author_huaticontent h5{
    color:#999;
    font-size: 42rpx;
    font-weight: bold;
    display: flex;
    justify-content: center;
}
.weui_author_star{
    width:100rpx;
    height:100rpx;
    border-radius:50%;
    background:#fff;
    position: absolute;
    top:-50rpx;
    right:60rpx;
    display:flex;
    -webkit-align-items:center;
    align-items:center;
    -webkit-justify-content:center;
    justify-content:center;
}
.weui_author_star .weui_author_staryellow i{
    color:#ccc;
    font-size: 60rpx;
}
.weui_author_star .authorYellow i{
    color:#FFCD00;
    font-size: 60rpx;
}
</style>


