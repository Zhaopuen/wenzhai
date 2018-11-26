<template>
	<div class="page">
	    <div class="page__bd">
			<div class="weui-search-bar">
				<div class="weui-search-bar__form">
				<div class="weui-search-bar__box" style="height:35px;">
					<icon class="weui-icon-search_in-box" type="search" size="14" style="top:20rpx;"></icon>
					<input type="text" style="height:35px;" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed"/>
					<div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
						<icon type="clear" size="14"></icon>
					</div>
				</div>
				<label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
					<icon class="weui-icon-search" type="search" size="14"></icon>
					<div class="weui-search-bar__text">搜索</div>
				</label>
				</div>
				<div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
			</div>
			<div class="searchlistbox">
				<div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
					<h4 class="searchauthors">
						<span style="display:block;float:left;">作者</span>
						<a :href="'/pages/searchauthorList/main?keyword='+inputVal">
							<span style="float:right" v-if="searchAuthorMore">更多</span>
						</a>
					</h4>
					<a :href="'/pages/authorDetail/main?id='+item.id" class="weui-cell" hover-class="weui-cell_active"  v-for="(item,index) in searchAuthor" :key="index">
						<div class="weui-cell__bd">
							<div>{{item.name}}</div>
						</div>
					</a>
				</div>
				<div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
					<h4 class="searchauthors">
						<span style="display:block;float:left;">标题</span>
						<a :href="'/pages/searchList/main?keyword='+inputVal">
				            <span style="float:right" v-if="searchMore">更多</span>
						</a>
					</h4>
					<a :href="'/pages/newsDetail/main?id='+item.id" class="weui-cell" hover-class="weui-cell_active"  v-for="(item,index) in searchArticle" :key="index">
						<div class="weui-cell__bd">
							<div>{{item.title}}</div>
						</div>
					</a>
				</div>
			</div>	
	    </div>
<div class="search_content">
	<div class="search_history" v-if="historyHideen">
		<div class="search_title">历史搜索</div>
		<div class="search_history_text">
			<div class="flex_bet hisserach" v-for="(item,index) in historyList" :key="index" >
				<a :href="'/pages/searchList/main?keyword='+item.keyword" style="width:80%;float:left;">
					<span style="display:block;float:left;font-size:0.9rem;">{{item.keyword}}</span>
				</a>
				<i class="iconfont icon-shanchu" @click="deteleHistory(index,item.keyword)" style="float:right;"></i>
			</div>
		</div>
	</div>
	<!-- <div class="secrch_recomm">
		<div class="search_title">推荐搜索</div>
		<div class="secrch_recomm_text">
			<div v-for="(item,index) in groomSearch" :key="index" class="search_groom" @click="hotSearchDeatail(item.id)">
				<img :src="http_url+item.pic" alt="">
				<h1>{{item.name}}</h1>
			</div>
		</div>
	</div> -->
	<div class="secrch_recomm">
		<div class="search_title">推荐搜索</div>
		<div class="secrch_recomm_text">
			<!-- <div v-for="(item,index) in groomSearch" :key="index" class="search_groom" @click="hotSearchDeatail(item.id)">
				<img :src="http_url+item.pic" alt="">
				<h1>{{item.name}}</h1>
			</div> -->
			<h1 class="search_name" v-for="(item,index) in groomSearch" :key="index" @click="hotSearchDeatail(item.id)">{{item.name}}</h1>
		</div>
	</div>
<!-- 热文 -->
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
			<div class="weui-tab__content" :hidden="activeIndex != 0">
				<div v-for="(item,index) in hourartical" :key="index">
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
								<img :src="http_url+item.pic" alt="" :mode="item.mode">
							</div>
							<div class="weui_artical_content">{{item.title}}</div>
						</div>  
					</a>
				</div>
			</div>
	          <div class="weui-tab__content" :hidden="activeIndex != 1" @click="weekHotArtical()">
					<div v-for="(item,index) in weekartical" :key="index">
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
									<img :src="http_url+item.pic" alt="" :mode="item.mode">
								</div>
								<div class="weui_artical_content">{{item.title}}</div>
							</div>  
						</a>
					</div>
				</div>
	        </div>
	      </div>
	    </div>
	</div>
</template>
<script>
	import userInfo from "../../components/userInfo";
	export default {
		data() {
			return {
				inputShowed: false,
				inputVal: "",
				tabs: ["24小时热文", "本周热文"],
				activeIndex: 0,
				fontSize: 30,
				keyword:'',
				hourartical: [{mode:'center'}],
				weekartical: [{mode:'center'}],
				historyList: [],
				groomSearch:[],
				searchArticle:[],
				http_url:'https://wenzhai.ichangbanmini.com',
				keyword:'',
				userInfoSign:null,
				userInfoId:'',
				artical: [],
				labelList: [],
				searchAuthor:[],
				searchMore: false,
				searchAuthorMore: false,
				historyHideen: false,
			}
		},
		
  watch:{
    inputVal:function(res1) {
      let _this = this;
			_this.inputVal = res1;
		
      if(_this.inputVal == '' || _this.inputVal == null){
      }else{
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function(){
			_this.hotauthorSearch();
			_this.hotSearch();	
        }, 1000);
      }
    },
  },
	computed: {
		navbarSliderClass() {
			if (this.activeIndex == 0) {
				return 'weui-navbar__slider_0'
			}
			if (this.activeIndex == 1) {
				return 'weui-navbar__slider_1'
			}
			if (this.activeIndex == 2) {
				return 'weui-navbar__slider_2'
			}
		}
	},
	methods: {
		showInput() {
			this.inputShowed = true;
			this.historyHideen = true;
		},
		hideInput() {
			this.inputVal = '';
			this.inputShowed = false;
			this.historyHideen = false;
		},
		clearInput() {
			this.inputVal = '';
		},
		tabClick(e) {   //tab 切换
			this.activeIndex = e.currentTarget.id;
		},
		//热搜的搜索  作者的搜索
		hotauthorSearch(){
			let that = this;
			let userInfo = wx.getStorageSync('userData')
			this.$Http({
				url:'author/getlist',
				data:{
					user_id:userInfo.id,
					keyword:that.inputVal
				},
				callback:res=>{
					if(res.data.length > 3){
						that.searchAuthorMore = true;
					}
					 that.searchAuthor = res.data.slice(0,3);
				}
			})
		}, 
		// 文章标题的搜索
		hotSearch(){
			let that = this;
			that.reachTitle = [];
			let userInfo = wx.getStorageSync('userData')
			this.$Http({
				url:'article/articleSearch',
				data:{
					user_id:userInfo.id,
					keyword:that.inputVal
				},
				callback:res=>{
					if(res.data.length > 3){
						that.searchMore = true;
					}
					that.historySearch();
					that.searchArticle = res.data.slice(0,3);
				}
			})
		},
		hotSearchDeatail(id){
			wx.navigateTo({
				url: '/pages/hoeSearchArtical/main?id=' + id
			})
		},

		//历史搜索记录
		historySearch(){
			let that = this;
			let userInfo = wx.getStorageSync('userData');
			this.$Http({
				url:'user_search_log/getlist',
				data:{
					user_id:userInfo.id
				},
				callback:res=>{
					that.historyList = res.data;
				}
			})
		},
		
		getUserInfo(){
			var that = this;
            if(wx.getStorageSync('userData')!= ''){
				let userInfo = wx.getStorageSync('userData');
				that.userInfoSign = userInfo.sign;
				that.userInfoId = userInfo.id;
				return;
			}
		},
		//删除历史搜索
		deteleHistory(index,keyword){
			let that = this;
			wx.showModal({
				content: '确定要删除吗？',
				confirmText: "确认",
				cancelText: "取消",
				success: function (res) {
					if (res.confirm) {
						that.$Http({
							url:'user_search_log/deleteSearchLog',
							data:{
								user_id:that.userInfoId,
								sign:that.userInfoSign,
								keyword:keyword
							},
							callback:res=>{
								that.historyList.splice(index,1);
							}
						})
					} else {
							
					}
				}
			});
		},

		//推荐搜索标签
		groomSearchAjax(){
			let that = this;
			this.$Http({
				url:'tag/getRecTag',
				data:{

				},
				callback:res=>{
					that.groomSearch = res.data.slice(0,8);
				}
			})
		},

		//24小时热文
		hourHotArtical(){
			let that = this;
			this.$Http({
				url:'article/getArticleList',
				data:{
					week:0
				},
				callback:res=>{
					that.hourartical = res.data;
				}
			})
		},

		//本周热文
		weekHotArtical(){
			let that = this;
			this.$Http({
				url:'article/getArticleList',
				data:{
					week:1
				},
				callback:res=>{
					that.weekartical = res.data;
				}
			})
		}
	},
	onShow(){
		console.log(this.globalData,'globalDataglobalData')
        this.groomSearchAjax();
		this.historySearch();
		this.hourHotArtical();
		this.weekHotArtical();
		this.getUserInfo();
		this.inputVal = "";
        wx.showShareMenu();
	},
	onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    },
}
</script>
<style scoped>
.page{
	height:100%;
	background:#f8f8f8;
}
.searchlistbox{
	width:100%;
	height:auto;
	overflow: hidden;
}
.search_name:nth-child(odd){
	width:46%;
	float:left;
	height:55rpx;
	line-height: 55rpx;
	font-size:30rpx;
	color:#555;
	overflow:hidden;
    text-overflow:ellipsis;
	white-space:nowrap;
	border-right: 1px solid #d9d9d9;
	padding-right: 3%;
}
.search_name:nth-child(even){
	width:46%;
	float:left;
	height:55rpx;
	line-height: 55rpx;
	font-size:30rpx;
	color:#555;
	overflow:hidden;
    text-overflow:ellipsis;
	white-space:nowrap;
	padding-left: 4%;
}
/* .search_name:nth-child(odd){
	border-right: 1px solid #d9d9d9;
}
.search_name:nth-child(even){
	padding-left: 30rpx;
} */
.weui-search-bar{
	background-color: #fff;
	border-top: 0;
	border-bottom:1px solid #fff;
}
.weui-search-bar__form{
 border-radius: 40rpx;
}
.weui-search-bar__text{
	font-size: 29rpx;
}
.weui-search-bar__label{
	background-color: #EAEAEA;
	border-radius: 40rpx;
	line-height: 70rpx !important;
}
.searchbar-result {
    margin-top: 0;
	font-size: 14px;
	margin-bottom:25rpx;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.searchauthors{
	padding:20rpx 40rpx;
	font-size:30rpx;
	color:#989898;
	width:90%;
	height:auto;
	overflow: hidden;
}

/*内容*/
.search_content{
	padding: 0 30rpx;
	background: #f8f8f8;
}
.search_title{
	line-height: 100rpx;
	font-size: 31rpx;
	font-weight: bold;
}

.search_history{
	padding-bottom:10rpx;
}
.search_groom{
	 width:32%;
	 height:100rpx;
   position:relative;
}
.search_groom img{
	width:100%;
	height:100%;
	border-radius:15rpx;
	/* position: absolute; */
}
.search_groom h1{
	position: absolute;
	margin:auto;
	top:0;
	right:0;
	left:0;
	bottom:0;
}
.search_groomimg{
	position:relative;
}
.search_groomimg div{
	position: absolute;
	z-index:9999999;
}
.search_groomimg img{
	width:100%;
	height:100%;
}
.search_history_text{
	background-color: #fff;
	padding: 0 10rpx;
	border-radius: 20rpx;
	font-size: 27rpx;
	color: #1E1E1E;
	max-height:510rpx;
  overflow-y:auto;
}
.search_history_text::-webkit-scrollbar {
	width: 5px;     
	height: 1px;
}
.search_history_text::-webkit-scrollbar-thumb {
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: #ccc;
}
.search_history_text::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 10px;
	background: #EDEDED;
}
.search_history_text>div{
	line-height: 100rpx;
	padding:0 20rpx;
	border-bottom: 1rpx solid #f8f8f8;
}

.secrch_recomm_text{
	display: flex;
	flex-wrap: wrap;
}
.secrch_recomm_text>div{
	width: 32%;
	height: 80rpx;
	margin-right:2%;
	margin-bottom: 2%;
	/* background-color: #0E90DF; */
	border-radius: 20rpx;
	text-align: center;
	line-height: 160rpx;
	font-size: 40rpx;
	color:#333;
}
.secrch_recomm_text>div:nth-child(3n){
	margin-right:0;
}


/*tab切换内容*/
.weui-navbar{
	background:#fff;
	margin-top: 18rpx;
}
.weui-navbar__item{
	color:#9f9f9f;
}
.weui-navbar__item.weui-bar__item_on{
	color: #000;
	border-color:2px solid #000;
}
.weui-navbar__slider{
	background-color: #000;
}
.weui-navbar__slider_0 {
  /* left: 55rpx; */
  transform: translateX(0rpx);
}
.weui-navbar__slider_1 {
  /* left: 54rpx; */
  left:50%;
  /* transform: translateX(50%); */
}
.flex_bet i{
	font-size:50rpx;
	color:#BCBCBC;
}
</style>