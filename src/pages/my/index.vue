<template>
	<div class="my_container">
		<div class="my_header">
			<div class="header_bg">
				<img src="../../../static/img/myback.png" alt="">
			</div>
			<div class="header_content">
				<div>
					<img :src="userInfoDatAvatar" alt="">
				</div>
				<div>
					{{userInfoData}}
				</div>
			</div>
		</div>
		<div class="my_content">
			<a href="/pages/collection/main">
				<div class="flex_bet">
					<div>
						<i class="iconfont icon-shoucang"></i>
						<span>我的收藏</span>
					</div>
					<div>
						<i class="iconfont icon-youjiantou"></i>
					</div>
				</div>
			</a>
			<a href="/pages/shoucang/main">
				<div class="flex_bet">
					<div>
						<i class="iconfont icon-wenben"></i>
						<span>浏览记录</span>
					</div>
					<div>
						<i class="iconfont icon-youjiantou"></i>
					</div>
				</div>
			</a>
			<a href="/pages/myTags/main">
				<div class="flex_bet">
					<div>
						<i class="iconfont icon-biaoqian"></i>
						<span>我的标签</span>
					</div>
					<div>
						<i class="iconfont icon-youjiantou"></i>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>
<script>
    import userInfo from "../../components/userInfo";
	export default {
		data () {
			return {
				userInfoData: null,
				userInfoDatAvatar: null
			}
		},
		methods: {
            getuserinfoData(){
				let _this = this;
				if(wx.getStorageSync('userData')!= ''){
					let userInfo = wx.getStorageSync('userData');
					_this.userInfoData = userInfo.nickname;
					_this.userInfoDatAvatar = userInfo.avatar;
					return;
				}
			},
		},
		mounted () {
            this.getuserinfoData();
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
.my_container{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #f8f8f8;
}
/*头部*/
.my_header{
	position: relative;
	width: 100%;
	height: 560rpx;
}
.header_bg{
	height: 340rpx;
}
.header_bg img{
	height:100%;
	width:100%;
}
.header_content{
	position: absolute;
	width: 220rpx;
	height: 260rpx;
	top:230rpx;
	left:260rpx;
	text-align: center;
	font-size: 38rpx;
	font-weight: bold;
}
.header_content img{
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
}
.my_content{
	background-color: #fff;
	margin: 0 30rpx;
}
.my_content .flex_bet{
	line-height: 100rpx;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f8f8f8;
}
.my_content .flex_bet>div{
	display: inline-flex;
}
.my_content .flex_bet span{
	padding-left: 15rpx;
	font-size: 31rpx;
}
.flex_bet div i{
	font-size:50rpx;
}
</style>