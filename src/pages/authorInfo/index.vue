<template>
    <div class="weui_author_detail">
       <div class="weui_author_header">
           <div class="weui_author_headerback">
                <div class="weui_author_headerimg">
                    <img src="http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg" alt="">
                    <p>陈独秀</p>
                </div>
           </div>
           <div class="weui_author_huati">
                <ul class="weui_author_huatibox">
                    <li class="weui_author_huaticontent" v-for="(item,index) in huati" :key="index">
                        <p>{{item.num}}</p>
                        <h5>{{item.title}}</h5>
                    </li>
                </ul>
                <div class="weui_author_star">
                    <div class="weui_author_staryellow"></div>
                </div>
           </div>
           <div class="weui_artical" v-for="(item,index) in artical" :key="index">
                <div class="weui_articlebox">
                    <div class="weui_artical_titleleft">
                        <img src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg" alt="" class="weui_artical_img">
                        <span class="weui_artical_name">{{item.name}}</span>
                    </div>
                    <div class="weui_artical_time">{{item.time}}</div>
                </div>	
                <div class="weui_artical_imgbox">
                    <img :src="item.src" alt="">
                </div>
                <div class="weui_artical_content">{{item.content}}</div>
            </div>	
       </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        huati:[
            {num:"17",title:"话题"},
            {num:"17",title:"回复"},
            {num:"17",title:"点赞"},
        ],
        artical: [
            {name:'陈独秀',time:'2018-10-13',src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',content:'夏季水果这么多，教你一招识别伪装的催熟水果。'},
            {name:'陈独秀',time:'2018-10-13',src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',content:'夏季水果这么多，教你一招识别伪装的催熟水果。'},
            {name:'陈独秀',time:'2018-10-13',src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',content:'夏季水果这么多，教你一招识别伪装的催熟水果。'},
            {name:'陈独秀',time:'2018-10-13',src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',content:'夏季水果这么多，教你一招识别伪装的催熟水果。'},
            {name:'陈独秀',time:'2018-10-13',src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',content:'夏季水果这么多，教你一招识别伪装的催熟水果。'},
        ],
      }
    },
    methods:{
        authorAjax(){
            this.$Http({
                url:'',
                data:{

                },
                callback:res=>{

                }
            })
        }

    },
    mounted(){

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
.weui_author_headerback{
    width:100%;
    height:480rpx;
    position: relative;
    background:url(http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg) no-repeat;
    display:flex;
    -webkit-align-items:center;
    align-items:center;
    -webkit-justify-content:center;
    justify-content:center;
    margin-bottom: 180rpx;
}
.weui_author_headerimg{
    position: absolute;
}
.weui_author_headerimg img{
    width:100rpx;
    height:100rpx;
    border-radius:50%;
}
.weui_author_huati{
    width:680rpx;
    height:240rpx;
    background:#fff;
    border-radius:18rpx;
    position: absolute;
    top:380rpx;
    z-index:888;
    border:1px solid #333;
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
.weui_artical:nth-of-type(1){
    margin-top:240rpx !important;
}
.weui_artical{
	padding-bottom:30rpx;
    background:#fff;
    margin:20rpx 0;
}
.weui_articlebox{
	padding:30rpx 50rpx 5rpx 50rpx;
	display:flex !important;
	overflow: hidden;
    justify-content:space-between;
}
.weui_artical_titleleft{
	width:60%;
	display:flex !important;
}
.weui_artical_img{
	display:block;
    width:65rpx;
	height:65rpx;
	border:1px solid #ccc;
	border-radius:50%;
	margin-right:30rpx;
}
.weui_artical_name{
	font-size:34rpx;
	display:flex !important;
	align-items:center;
}
.weui_artical_time{
	height:60rpx;
	font-size:28rpx;
	margin-top:15rpx;
	color:#999;
}
.weui_artical_imgbox{
    padding:20rpx 0;
	display: flex;
    justify-content:center;
}
.weui_artical_imgbox img{
	width: 680rpx;
    height:300rpx;
}
.weui_artical_content{
	display:flex;
	justify-content: center;
	font-size:32rpx;
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
.weui_author_star .weui_author_staryellow {
    width:60rpx;
    height:60rpx;
    border-radius:50%;
    background:yellow;
}
</style>


