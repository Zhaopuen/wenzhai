<template>
    <div class="liulan_box">
        <div v-for="(item,index) in artical" :key="index">
            <a :href="'/pages/newsDetail/main?id='+item.article_id">
                <div class="weui_artical">
                    <div class="weui_articlebox">
                        <div class="weui_artical_titleleft">
                            <img :src="http_url+item.author.avatar" alt="" class="weui_artical_img">
                            <span class="weui_artical_name">{{item.author.name}}</span>
                        </div>
                        <div class="weui_artical_time">{{item.update_time_text}}</div>
                    </div>  
                    <div class="weui_artical_imgbox">
                        <img :src="http_url+item.article.pic" alt="">
                    </div>
                    <div class="weui_artical_content">{{item.article.title}}</div>
                </div>  
            </a>
        </div>
    </div>
</template>
<script>
import userInfo from "../../components/userInfo";
export default {
    data(){
        return{
            artical: [],
            user_id:'',
            http_url:'https://wenzhai.ichangbanmini.com',
            userInfoId:'',
            userInfoSign:null
        }
    },
    methods:{
        browseAjax(){
            let that = this;
            let userInfo = wx.getStorageSync('userData');
            that.userInfoId = userInfo.id;
            this.$Http({
                url:'user_visit_log/getlist',
                data:{
                    user_id:that.userInfoId
                },
                callback:res=>{
                    that.artical = res.data;
                }
            })
        },
    },
    mounted(){
        this.browseAjax();
    },
    onShow(){
        wx.showShareMenu();
    },
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    }
}
</script>
<style>
.liulan_box{
    background:#f8f8f8;
    padding:10rpx 30rpx;
}
</style>

