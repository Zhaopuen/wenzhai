<template>
	<div class="collection">
		<div class="weui-tab">
			<div class="weui-navbar">
				<block v-for="(item,index) in tabs" :key="index">
				<div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
					<div class="weui-navbar__title">{{item}}</div>
				</div>
				</block>
				<div class="weui-navbar__slider" :class="navbarSliderClass"></div>
			</div>
			<div class="weui-tab__panel">
				<div class="weui-tab__content weui_tab_collectiobox" :hidden="activeIndex != 0">	  
					<div v-for="(item,index) in artical" :key="index">
						<a :href="'/pages/newsDetail/main?id='+item.article.id">
							<div class="weui_artical">
								<div class="weui_articlebox">
									<div class="weui_artical_titleleft">
										<img :src="http_url+item.article.author.avatar" alt="" class="weui_artical_img">
										<span class="weui_artical_name">{{item.article.author.name}}</span>
									</div>
									<div class="weui_artical_time">{{item.create_time_text}}</div>
								</div>  
								<div class="weui_artical_imgbox">
									<img :src="http_url+item.article.pic" alt="">
								</div>
								<div class="weui_artical_content">{{item.article.title}}</div>
							</div>  
						</a>
					</div>
				</div>
				<div class="weui-tab__content" :hidden="activeIndex != 1">
					<ul class="weui_author" v-for="(item,index) in author" :key="index">
						<li class="weui_author_li">
							<a :href="'/pages/authorDetail/main?id='+item.author.id" class="weui_author_aa">
								<div class="weui_author_box">
									<img :src="http_url+item.author.avatar" alt="" class="weui_author_img"> 
								</div>
								<div class="weui_author_titlebox">
									<span class="weui_author_title">{{item.author.name}}</span>
									<span class="weui_author_content">{{item.author.intro}}</span>
								</div>
							</a>
						</li>
					</ul>
				</div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tabs: ["文章", "作者",],
				artical: [],
				author: [],
				activeIndex: 0,
				fontSize: 30,
				http_url:'https://wenzhai.ichangbanmini.com',
				userInfoSign:null,
                userInfoId:''
			}
		},
		computed: {
			navbarSliderClass () {
				if(this.activeIndex == 0 ){
					return "weui-navbar__slider_0"
				}
				if(this.activeIndex == 1 ){
					return "weui-navbar__slider_1"
				}
			}
		},
		methods: {
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
			tabClick (e) {
				this.activeIndex = e.mp.currentTarget.id;
			},
		    //文章收藏
			collectAjax(){
				let that = this;
				let userInfo = wx.getStorageSync('userData');
				this.$Http({
					url:'collection/getlist',
					data:{
						user_id:userInfo.id,
						type:0
					},
					callback:res=>{
						that.artical = res.data;
					}
				})
			},

			//作者收藏
			authorAjax(){
				let that = this;
				let userInfo = wx.getStorageSync('userData');
				this.$Http({
					url:'collection/getlist',
					data:{
						user_id: userInfo.id,
						type: 1
					},
					callback:res=>{
						that.author = res.data;
					}
				})
			}
		},
		mounted(){
			this.collectAjax();
			this.authorAjax();
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
<style scoped>
.collection{
	height:100%;
	background:#f8f8f8;
}
.weui_artical_acolor{
	background:#fff;
	margin-bottom: 20rpx;
}
.weui-tab__content {
	text-align: center;
	margin:30rpx;
}

.weui-navbar{
	color:#666;
	background:#fff;
}
.weui-navbar__slider_0 {
  /* left: 29rpx; */
  /* transform: translateX(66rpx); */
}
.weui-navbar__slider_1 {
  left: 50%;
  /* transform: translateX(440rpx); */
}
.weui-navbar__slider{
	width:50%;
	/* width: 5.2em; */
	background-color: #000;
}
.weui-navbar__item.weui-bar__item_on{
	color: #000;
}
.weui_author{
	display:flex;
	padding:20rpx 40rpx;
	background:#fff;
	margin-bottom:12rpx;
}
.weui_author_box{
	margin-right:30rpx;
	display:flex;
	align-items:center;
}
.weui_author_titlebox{
	width:80%;
	height:auto;
	overflow:hidden;
	text-align:left;
}
.weui_author_box img{
	width:150rpx;
	height:150rpx;
	border-radius:50%;
}
.weui_author_title{
	font-size:32rpx;
	display:flex !important;
	justify-content: flex-start;
}
.weui_author_content{
	font-size: 28rpx;
	color:#666;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	width:100%;
}

.weui_author_aa{
	width:100%;
	display:flex;
}
.weui_author_li{
	width:100%;
	height:auto;
	overflow: hidden;
}
</style>