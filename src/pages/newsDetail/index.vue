<template>
	<div class="detail_container" v-if="tableInfo">
		
		<div class="news_detail">
			<div class="font_h1">
				{{tableInfo.title}}
			</div>
			<div class="detail_content">
				<!-- 人物信息 -->
				<div class="detail_avtar flex_bet">
					<a :href="'/pages/authorDetail/main?id='+tableInfo.author_id" class="weui_author_aa">
						<div class="flex_bet">
							<img :src="http_url+tableInfo.avatar" class="this_avtar_img">
							<span>{{tableInfo.author_name}}</span>
						</div>
					</a>
					<div class="font_p">
						{{tableInfo.create_time}}
					</div>
				</div>
				<!-- 文章内容 -->
				<div class="detail_text font_text">
					<div  style="background:#fff;padding:0 15rpx;height:auto;overflow:hidden;">
                       <wxParse :content="tableInfocontent" @preview="preview" @navigate="navigate"/>
					   <!-- {{tableInfocontent}} -->
					</div>
					<div class="detail_comment flex_bet">
						<div class="font_p" style="display:inline-flex">
							<span  v-for="(item,index) in tableInfotag" :key="index" style="margin-right:10rpx;">{{item.name}}</span>
						</div>
						<div class="detail_praise flex_bet">
							<div>
								<i class="iconfont icon-iconset0207 icon_margin_top"></i>
								{{tableInfo.visit_count}}
							</div>
							<div @click="addCount">
								<i class="iconfont icon-zan" :class="{ icon_green: addFlag }"></i>
								{{tableInfo.like_count}}
							</div>
							<div>
								<a :href="'/pages/userComment/main?id='+tableInfo.id + '&is_banned=' + tableInfo.is_banned" class="flex_bet">
									<i class="iconfont icon-pinglun icon_margin_top"></i>
									{{detailComment}}
									<!-- {{tableInfo.comment_count}} -->
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="font_h5">
					相关阅读
			</div>
		</div>
		<div class="news_ready">
			<div v-for="(item,index) in relevantLook" :key="index">
				<a :href="'/pages/newsDetail/main?id='+item.id">
					<div class="weui_artical">
						<div class="weui_articlebox">
							<div class="weui_artical_titleleft">
								<img :src="http_url+item.avatar" alt="" class="weui_artical_img">
								<span class="weui_artical_name">{{item.name}}</span>
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
		<!-- 评论 -->
		<!-- 最新评论 -->
		<div class="new_comment">
			<div class="comment_title">评论</div>
			<div class="hot_content">
				<div v-if="new_flag" class="text_kong">—— 暂时没有评论 ——</div>
				<div class="hot_text" v-for="(item,index) in newComment" :key="index">
					<div class="hot_avatar flex_bet">
						<div>	
							<img :src="item.user.avatar" alt="">
							<span class="hot_font">{{item.user.nickname}}</span>
						</div>
						<div class="font_span" @click="addCommentZan(index,item.id)">
							<i class="iconfont icon-zan" :class="{ icon_green: addFlag }"></i>
							<span>{{item.like_count}}</span>
						</div>
					</div>
					<div class="font_p hot_title_text">{{item.content}}</div>
					<div class="hot_time font_span">
						<div>
							<span class="padding_right">{{item.create_time_text}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer_style">
			—— 我是有底线的 ——
		</div>
		<div class="comment_footer">
			<div class="comment_ft_icon">
				<a :href="'/pages/userComment/main?id='+tableInfo.id + '&is_banned=' + tableInfo.is_banned">
				    <i class="iconfont icon-qianbi"></i>
				</a>
			</div>
			<div class="comment_ft_input">
				<input type="text" :placeholder="placeholder" confirm-type="send" v-model="inputValue" :disabled="disabled"/>
			</div>
			<button class="comment_ft_btn sendbox shareButton" @click="addComments">
				<div class="comment_ft_iconss">
					<i class="iconfont icon-send"></i>
				</div>
				<div>发送</div>
			</button>
			<button class="comment_ft_btn detail_praise shareButton" @click="onShareAppMessage" open-type="share">
				<div class="comment_ft_iconss">
					<!-- <img src="../../../static/img/share.png" alt=""> -->
					<i class="iconfont icon-fenxiang"></i>
				</div>
				<span class="comment_ft" style="display:inline-block;">分享</span>
			</button>
			<button class="comment_ft_btn detail_praise collects shareButton" @click="newsCollection">
				<div class="comment_ft_iconss">
					<i class="iconfont icon-msnui-collection" :class="{ icon_green: collectFlags }"></i>
				</div>
				<span class="comment_ft" :class="{ icon_green: collectFlags }" style="display:inline-block;">收藏</span>
				<!-- <div v-else class="comment_ft icon_green">已收藏</div> -->
			</button>
			<button class="comment_ft_btn detail_praise dianzaicolor shareButton" @click="addCount" style="z-index:99999">
				<div class="comment_ft_iconss">
					<i class="iconfont icon-zan" :class="{ icon_green: addFlag }"></i>
				</div>
				<!-- v-if="!zan" -->
				<span class="comment_ft" :class="{ icon_green: addFlag }" style="display:inline-block;">点赞</span>
				<!-- <div v-else class="comment_ft icon_green">已点赞</div> -->
			</button>
		</div>
		<div class="backhome" @click="gotoHome" v-if="isHome">
			<img src="../../../static/img/home.png" alt="">
		    <text>首页</text>
		</div>
		<div class="backhome" @click="nextwx" style="top:550rpx" v-if="isShow">
			<img src="../../../static/img/return.png" alt="" style="margin-top:12rpx;">
		    <text style="margin-top:-25rpx;">返回</text>
		</div>
	</div>
</template>
<script>
	import wxParse from 'mpvue-wxparse'
	import artical from '@/components/Article';
	import userInfo from "../../components/userInfo";
	export default {
		data () {
			return {
				http_url:'https://wenzhai.ichangbanmini.com',
				ready_data: [],
				artical: [],
				article_id:'',
				tableInfo:null,
				relevantLook:[],
				addFlag:false,
				inputValue:'',
				colleFlag:false,  //收藏状态
				userInfoSign:null,
				userInfoId:'',
				tableInfotag:[],
				tableInfocontent: '',
				zan:false, 
				newComment: [],
				new_flag:false,
				disabled:false,
				placeholder:'点击在此处输入你要说的话',
				detailComment:'',
				collectFlags: false,
				isShow: false,
				isHome: true,
			}
		},
		methods: {
			// 回到首页
			gotoHome(){
				console.log(2222)
				wx.switchTab({
					url: "/pages/index/main",
				})
			},
			// 分享
			onShareAppMessage(){
				var that = this;
				return {
					title: "",
					desc: "",
					path: "",
					imageUrl: "",
					success: function(t) {
						console.log(1);
					},
					fail: function(t) {
						console.log(2);
					}
				};
			},
			//文章详情
            newsDetail(){
				let that = this;
				let userInfo = wx.getStorageSync('userData');
				that.$Http({
					url:'article/detail',
					data:{
						article_id: that.$root.$mp.query.id,
						user_id:userInfo.id
					},
					callback(res){
						console.log(res,'这是详情的文章')
						that.tableInfo = res.res;
						that.tableInfotag = res.res.tags.slice(0,3);
						that.tableInfocontent = res.res.content.replace(/<section>|<\/section>/g,' ');
						that.relevantLook = res.relevant.slice(0,5);
						if(res.res.is_banned == 1){
							that.disabled = true;
							that.placeholder = '该用户已被禁言，暂不能评论'
						}else{
                            that.disabled = false;
							that.placeholder = '点击在此处输入你要说的话'
						}
						if(res.res.is_col == 1){
							that.colleFlag = true;
							that.collectFlags = true;
						}else{
							that.colleFlag = false;
							that.collectFlags = false;
						}
						if(res.res.is_like == 1){
							that.zan = true;
							that.addFlag = true;
						}else{
							that.zan = false;
							that.addFlag = false;
						}
					}
				})
			},
			newsDetailComment(){
				let that = this;
				let userInfo = wx.getStorageSync('userData');
				this.$Http({
					url:'article/detail',
					data:{
                        article_id: that.$root.$mp.query.id,
						user_id:userInfo.id
					},
					callback:res=>{
						that.detailComment = res.res.comment_count;
						console.log(res.res.comment_count,'22222222222222')
					}
				})
			},
			// 评论
			commentNew(){
				let that = this;
				this.$Http({
					url:'comment/getlist',
					data:{
						article_id:that.$root.$mp.query.id,
						hot:0
					},
					callback:res=>{
						if(res.data==""){
							that.new_flag = true;
						}else{
							that.new_flag = false;
							for(let k in res.data){
								res.data[k].selected = false;
							}
							that.newComment = res.data;
						}
					}
				})
			},
			//添加收藏
			newsCollection(){
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
						type:0
					},
					callback:res=>{
						if(res.msg == "收藏成功"){
							that.colleFlag = true;
							that.collectFlags = true;
							wx.showToast({
								title: '收藏成功',
								icon: 'none',
								duration: 1000
							})
						}
						if(res.msg == "已取消收藏"){
							that.colleFlag = false;
							that.collectFlags = false;
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
			// 点赞
			addCount(){
				let that = this;
				let userInfo = wx.getStorageSync('userData');
				that.userInfoSign = userInfo.sign;
				that.userInfoId = userInfo.id;
				that.addFlag = !that.addFlag;
				if(that.addFlag){
                    that.tableInfo.like_count+=1;
				}else{
					that.tableInfo.like_count-=1;
				}
				that.$Http({
					url:'collection/add',
					data:{
						user_id:that.userInfoId,
						sign:that.userInfoSign,
						id:that.$root.$mp.query.id,
						type:3
					},
					callback:res=>{
						if(res.msg == "点赞成功"){
							that.zan = true;
							that.addFlag = true;
						}
						if(res.msg == "已取消赞"){
							that.zan = false;
							that.addFlag = false;
						}
					}
				})
			},
			// 评论
			addComments(){
				let that = this;
				let userInfo = wx.getStorageSync('userData');
				that.userInfoId = userInfo.id;
				if(that.inputValue==""){
					wx.showToast({
						title:"评论不能为空",
						icon:'success',
						duration:1000
					})
					return
				}
				that.$Http({
					url:'comment/addComment',
					data:{
						article_id:that.$root.$mp.query.id,
						user_id:that.userInfoId,
						content:that.inputValue,
						parent_id:0
					},
                    callback:res=>{
						that.commentNew();
						that.newsDetailComment();
						that.inputValue = "";
						if(res.data.content == ""){
							return
						}
                    	if(res.status == 1){
                    		wx.showToast({
                    			title:"添加成功",
                    			icon:'success',
                    			duration:1000
                    		})
                    	}else{
                    		wx.showToast({
                    			title:"添加失败",
                    			icon:'none',
                    			duration:1000
                    		})
                    	}
					}
				})
			},
			// 评论点赞
			addCommentZan(index,id){
				let that = this;
				that.newComment[index].selected = !that.newComment[index].selected;
				if(that.newComment[index].selected){
                    that.newComment[index].like_count++;
				}else{
					that.newComment[index].like_count--;
				}
				that.$Http({
					url:'collection/add',
					data:{
						user_id:that.userInfoId,
						sign:that.userInfoSign,
						id:id,
						type:2
					},
					callback:res => {
						// console.log(res)
					}
				})
			},
			preview(src, e) {
				
				console.log(src,"bbbbbbbbbb")
				// do something
			},

			// 富文本wxparse的点击事件
			navigate(href, e) {
				var eHref = e.mp.target.dataset.href;
				var serchApp = eHref.search("appid") != -1;
				if(eHref.search("appid") != -1 == false){
					wx.navigateTo({
						url:eHref
					})
				}else if(eHref.search("appid") != -1 == true){
					var appIdHref = e.mp.target.dataset.href.split('/')[2];
                    wx.navigateToMiniProgram({
						appId: appIdHref,
						path: eHref,
						extraData: {},
						envVersion: 'develop',
						success(res) {
							console.log(res,'成功跳转到另外一个小程序')
							// 打开成功
						}
					})
				}
			},
			// 跳转到上一个小程序
			nextwx(){
		        wx.navigateBackMiniProgram({
					extraData: {
						foo: 'bar'
					},
					success(res) {
						console.log(res)
					// 返回成功
					}
				})
			}
		},
		components:{
           artical,
		   wxParse,
		},
		onShow () {
			this.commentNew();
			this.newsDetailComment();
			if(wx.getStorageSync("options").scene == 1037){
				this.isShow = true;
				this.isHome = false;
				// wx.reLaunch({
				//    url: '/pages/newsDetail/main',
				// })
			}else{
				this.isShow = false;
				this.isHome = true;
			}
		},
		onLoad(options){
			var that = this;
			that.tableInfocontent = "";
			that.tableInfo = "";
			that.tableInfotag = "";
			that.relevantLook = "";
			that.newsDetail();	
		},
		// onPullDownRefresh: function(){
		// 	wx.stopPullDownRefresh();
		// },
		
	}
</script>
<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.backhome{
  width:110rpx;
  height:110rpx;
  background: #04B8B7;
  border-radius: 50%;
  position: fixed;
  top:700rpx;
  right:30rpx;
  text-align: center;
}
.backhome img{
  width:50rpx;
  height:50rpx;
  margin-top: 6rpx;
}
.backhome text{
  display: block;
  color:#fff;
  font-size: 28rpx;
  margin-top: -12rpx;
}
.detail_container{
	height:100%;
	background:#f8f8f8;
}
.news_detail{
	padding:30rpx;
	background: #f8f8f8;
}
button::after {
  border: unset;
  color:unset;
}
.shareButton{
	background: transparent;
	border:none;
	line-height:40rpx !important;
	font-size:28rpx !important;
	/* position:static !important; */
	width:18%;
	padding:0;
	color:#333;
}
.shareButton .comment_ft_iconss img{
	width:32rpx;
	height:32rpx;
	margin-top: 5rpx;
	margin-bottom:-10rpx;
}

/*头像时间区域*/
.detail_avtar{
	line-height: 70rpx;
	padding:30rpx 0;
}
.detail_avtar span{
	color: #545454;
	font-size: 30rpx;
}
/*文字区域*/
.detail_text{
	text-align: justify;
	overflow: hidden;
	line-height:60rpx;
}
.detail_comment{
	padding: 30rpx 0;
	color: #545454;
	line-height:60rpx;
}
.detail_praise>div{
	display: inline-flex;
	/* margin-left: 10rpx; */
}
.detail_praise>div .iconfont{
	font-size: 50rpx;
}
/*预览图标样式*/
.icon_margin_top{
	margin-top:2rpx;
}
/*相关阅读*/
.news_ready{
	background: #f8f8f8;
	padding:0 30rpx;
}
.comment_footer{
	display: flex;
	width: 100%;
	position: fixed;
	bottom: 0;
	background: #fff;
	height: 100rpx;
	border-top:1px solid #f8f8f8;
}
.comment_ft_icon{
	display: flex;
	align-items: center;
	width: 10%;
	justify-content: center;
	z-index:999999;
}
.comment_ft_icon i{
	font-size:40rpx;
}
.comment_ft_input{
	width: 75%;
}
.comment_ft_btn{
	width: 15%;
	text-align: center;
	font-size: 28rpx;
	padding:5rpx 0;
}
.comment_ft_btn i{
	font-size: 28rpx !important;
}
.comment_footer input{
	width: 100%;
	padding:25rpx 0;
	height: 60rpx;
	font-size: 26rpx;
	color: #757575;
}
.detail_praise>div i.icon_green{
	color:#F98B2F;
}
.comment_ft_btn{
	z-index:99999;
}
.collects>div i.icon_green{
	color:#F98B2F;
}
.collects>span.icon_green{
	color:#F98B2F;
}
.dianzaicolor>span.icon_green{
	color:#F98B2F;
}
.sendzan i{
	color:#F98B2F;
}
.sendbox img{
	width:40rpx;
	height:40rpx;
}
/* 评论 */
.hot_title_text{
	padding: 20rpx 0;
}
.hot_text{
	background-color:#fff;
	padding:10rpx 30rpx;
	margin-bottom:15rpx;
}
.font_span i{
	font-size:45rpx;
}
.font_span span{
	font-size:28rpx;
}
.text_kong{
	text-align:center;
	color:#777;
}
.font_span i.icon_green{

	color:#F98B2F;
}
.hot_font{
	font-size: 31rpx;
}
.hot_avatar>div{
	display: inline-flex;
	line-height: 60rpx;
}
.hot_avatar img{
	display: inline-block;
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin-right:20rpx;
}
.hot_avatar .iconfont{
	font-size:36rpx;
}
.new_comment{
	padding-bottom:100rpx;
}
.comment_title{
	font-size: 36rpx;
	line-height:100rpx;
	padding-left:30rpx;
	color:#333;
	font-weight:bold;
}
.text_kong{
	text-align:center;
	color:#777;
}
.comment_ft{
	text-align: center;
	color:#333;
}
</style>