<template>
    <div class="liulan_boxss">
        <div v-for="(item,index) in artical" :key="index">
            <a :href="'/pages/newsDetail/main?id='+item.id">
                <div class="weui_artical">
                    <div class="weui_articlebox">
                        <div class="weui_artical_titleleft">
                            <img :src="http_url+item.arthor.avatar" alt="" class="weui_artical_img">
                            <span class="weui_artical_name">{{item.arthor.name}}</span>
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
        // 获取登陆的信息
        getUserInfo(){
            var that = this;
            if(wx.getStorageSync('userData')!= ''){
                let userInfo = wx.getStorageSync('userData');
                that.userInfoSign = userInfo.sign;
                that.userInfoId = userInfo.id;
                return;
            }
        },
        browseAjax(){
            let that = this;
            let detail = []
            detail.push(that.$root.$mp.query.id)
            this.$Http({
                url:'tag/getTagArticleList',
                data:{
                    tag_ids:detail,
                },
                callback:res=>{
                    that.artical = res.data;
                }
            })
        }
    },
    mounted(){
        this.browseAjax();
        this.getUserInfo();
    },
    onShow(){
        wx.showShareMenu();
    },
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    },
}
</script>
<style>
.liulan_boxss{
    background:#f8f8f8;
    padding:10rpx 30rpx;
}
</style>

