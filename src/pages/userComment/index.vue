<template>
	<div class="comment-container">
		<!-- 热门评论 -->
		<div class="hot_comment" v-if="hotComment!=''||hotComment!=undefined">
			<div class="comment_title">热门评论</div>
			<div class="hot_content">
				<div v-if="hot_flag" class="text_kong">—— 暂时没有热门评论 ——</div>
				<div class="hot_text" v-for="(item,index) in hotComment" :key="index">
					<div class="hot_avatar flex_bet">
						<div>	
							<img :src="item.user.avatar" alt="">
							<span class="hot_font">{{item.user.nickname}}</span>
						</div>
						<div class="font_span" @click="hotaddCommentZan(index,item.id)">
							<i class="iconfont icon-zan"></i>
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
		<!-- 最新评论 -->
		<div class="new_comment">
			<div class="comment_title">最新评论</div>
			<div class="hot_content">
				<div v-if="new_flag" class="text_kong">—— 暂时没有最近评论 ——</div>
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
		<div class="comment_footer">
			<div class="comment_ft_icon">
				<i class="iconfont icon-qianbi"></i>
			</div>
			<div class="comment_ft_input">
				<input type="text" :placeholder="placeholder" v-model="inputValue" :disabled="disabled"/>
			</div>
			<div class="comment_ft_btn">
				<a type="button" @click="addComment()">确定</a>
			</div>
		</div>
	</div>
</template>
<script>
    import userInfo from "../../components/userInfo";
	export default {
		data () {
			return {
				article_id:'',
				hotComment:[],
				newComment:[],
				inputValue:'',
				addFlag:false,
				hotchidden:false,
				hot_flag:false,    //新
				new_flag:false,
				userInfoSign:null,
				userInfoId:'',
				disabled:false,
				placeholder:'点击在此处输入你要说的话',
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
			//热门评论
			commentAjax(){
				let that = this;
				this.$Http({
					url:'comment/getlist',
					data:{
						article_id:that.$root.$mp.query.id,
						hot:1
					},
					callback:res=>{
						if(res.data==""){
							that.hot_flag = true;
						}else{
							that.hot_flag = false;
							that.hotComment = res.data;
						}
					}
				})
			},
			//最新评论
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
			//添加评论
			addComment(){
				let that = this;
				if(that.inputValue==""){
					wx.showToast({
						title:"评论不能为空",
						icon:'success',
						duration:1000
					})
					return
				}
				this.$Http({
					url:'comment/addComment',
					data:{
						article_id:that.$root.$mp.query.id,
						user_id:that.userInfoId,
						content:that.inputValue,
						parent_id:0
					},
                    callback:res=>{
						that.commentAjax();
						that.commentNew();
                    	that.inputValue = "";
                    	if(res.status == 1){
                    		wx.showToast({
                    			title:res.res,
                    			icon:'success',
                    			duration:1000
                    		})
                    	}else{
                    		wx.showToast({
                    			title:res.res,
                    			icon:'none',
                    			duration:1000
                    		})
                    	}
					}
				})
			},
			// 热门评论点赞
			hotaddCommentZan(index,id){
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
			}
		},
		mounted () {
			console.log(this.$root.$mp.query)
			if(this.$root.$mp.query.is_banned == 1){
				this.disabled = true;
				this.placeholder = "该用户已被禁言，赞不能评论"
			}else{
				this.disabled = false;
				this.placeholder = '点击在此处输入你要说的话'
			}
			this.commentAjax();
			this.commentNew();
			this.getUserInfo();
		},
		onShow(){
            wx.showShareMenu();
		},
		onPullDownRefresh: function(){
            wx.stopPullDownRefresh()
        }
	}
</script>
<style scoped>
.comment-container{
	background: #f8f8f8;
	min-height: 600px;
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
/*顶部评论*/
.comment_footer{
	display: flex;
	width: 100%;
	position: fixed;
	bottom: 0;
	background: #fff;
	line-height: 100rpx;
}
.comment_ft_icon{
	width: 10%;
	text-align: center;
}
.comment_ft_input{
	width: 75%;
}
.comment_ft_btn{
	width: 15%;
	text-align: center;
	font-size: 28rpx;
	background-color: #5589DC;
	color: #fff;
}
.comment_footer input{
	width: 100%;
	padding:25rpx 0;
	height: 60rpx;
	font-size: 26rpx;
	color: #757575;
}
/*头像点赞*/
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
	font-size:27rpx;
}
/*内容*/
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
</style>