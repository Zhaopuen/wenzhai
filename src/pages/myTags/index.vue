<template>
    <div class="weui_mytags">
        <div class="weui-cell_tags" v-for="(item,index) in tagsList" :key="index">
            <div class="weui_tags_title">
                <i class="iconfont icon-wenben"></i>
                <span>{{item.tag.name}}</span>
            </div>
            <div class="weui_tags_delete" @click="deteleTags(index, item.tag_id)">
                <i class="iconfont icon-shanchu icon_shanchu_detele" ></i>               
            </div>
        </div>
        <div class="weui_tags_button">
            <a :href="'/pages/label/main?id=0' ">添加新标签</a>
        </div>
    </div>
</template>
<script>
import userInfo from "../../components/userInfo";
export default {
    data(){
        return{
            tagsList:[],   
            tag_id:'',
            sign:'',
            tagAdd_id:'',
            userInfoSign:null,
            userInfoId:''
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
        //获取我的标签
        myTags(){
            let userInfo = wx.getStorageSync('userData');
            let that = this;
            this.$Http({
                url:'user_tag/getlist',
                data:{
                    user_id:userInfo.id,
                },
                callback:res=>{
                    that.tagsList = res.data;
                    // for (var i = 0; i < that.tagsList.length; i++) {
                    //     if(hash.indexOf(tagsList[i])==-1){
                    //        hash.push(tagsList[i]);
                    //     }
                    // }
                    // return hash;
                    // for (var i = 0; i < tagsList.length; i++) {
                    //     if (tagsList.indexOf(tagsList[i]) != i) {
                    //         tagsList.splice(i,1);//删除数组元素后数组长度减1后面的元素前移
                    //         i--;//数组下标回退
                    //     }
                    // }
                    // return tagsList;
                }
            })
        },
        //删除标签
        deteleTags(index,id){
            let that = this;
            let userInfo = wx.getStorageSync('userData');
            let label_arr = [];
            wx.showModal({
                content: '确定要删除吗？',
                confirmText: "确认",
                cancelText: "取消",
                success: function (res) {
                    if (res.confirm) {
                        that.$Http({
                            url:'user_tag/deleteUserTag',
                            data:{
                                user_id:userInfo.id,
                                tag_id:id,
                                sign:that.userInfoSign
                            },
                            callback:res=>{
                                if(res.status==1){
                                    // try {
                                        // if(wx.getStorageSync('label_arrr')){
                                        //     var arr = wx.getStorageSync('label_arrr')
                                        //     arr.push(id)
                                        //     wx.setStorage({
                                        //         key: "label_arrr",
                                        //         data: arr
                                        //     })
                                        // }else{
                                        //     var arr = []
                                        //     arr.push(id)
                                        //     wx.setStorage({
                                        //         key: "label_arrr",
                                        //         data: arr
                                        //     })
                                        // }
                                        // var value = wx.getStorageSync('label_arr');
                                        // if (value) {
                                        //     value.forEach(function(item,index){
                                        //         if(item==id){
                                        //             label_arr = value.splice(index,1)
                                        //         }
                                        //     })
                                        // }
                                    // } catch (e) {}
                                    // try {
                                    //     wx.removeStorageSync('label_arr')
                                    // } catch (e) {
                                      
                                    // }
                                    // wx.setStorage({
                                    //     key: "label_arr",
                                    //     data: label_arr
                                    // })
                                    that.tagsList.splice(index,1);
                                }
                            }
                        })
                    } else {
                        // console.log("您点击了取消")
                    }
                }
            });
        },
        //获取添加新标签列表
        newTags(){
            let that = this;
            taht.$Http({
                url:'user_tag/getNewUserTag',
                data:{
                    user_id:that.userInfoId
                },
                callback:res=>{
                    that.tagsList = res.data;
                }
            })
        },
        //添加评论
        addTags(){
            this.$Http({
                url:'tag/setUserTag',
                data:{
                    user_id:that.userInfoId,
                    tags_id: that.$root.$mp.query.id
                },
                callback:res=>{
                    // console.log(res.data)
                }
            })
        }
    },
    onShow(){
        this.myTags();
        this.getUserInfo();
        wx.showShareMenu();
    },
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    },
}
</script>
<style scoped>
.weui_mytags{
    height:auto;
    overflow: hidden;
    background-color: #f8f8f8;
    padding:30rpx;
    /* position:fixed; */
    width:93%;
}
.weui-cell_tags{
    background-color: #fff;
	line-height: 100rpx;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f8f8f8;
    display:flex;
    justify-content: space-between;
}
.weui-cell_tags i{
    font-size:44rpx;
    margin-right:20rpx;
}
.weui_tags_title{
	display: inline-flex;
}
.weui_tags_titlespan{
	padding-left: 15rpx;
	font-size: 31rpx;
}
.weui_tags_delete{
    display:inline-flex;
}
.weui_tags_button{
    display:flex;
    justify-content: center;
    align-items:center;
}
.weui_tags_button a{
    width:500rpx;
    height:100rpx;
    background:#444;
    color:#fff;
    font-size: 38rpx;
    display:flex;
    justify-content: center;
    align-items:center;
    border-radius:50rpx;
    /* position:fixed; */
    bottom:60rpx;
    margin-top:30rpx;
}
.icon_shanchu_detele{
    color:#BCBCBC;
}
</style>


