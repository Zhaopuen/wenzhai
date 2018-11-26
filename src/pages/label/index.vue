<template>
	<div class="index_wrap">
          <!-- 登陆 -->
	    <sign-in-btn></sign-in-btn>
		<div class="tag_content">
			<div class="tag_h2">
				选择您感兴趣的标签
			</div>
			<swiper class="tag_swiper" indicator-color="#CCC" :indicator-dots="true" :indicator-active-color="swiper_color">
				<block v-for="(item,index) in labelTagdata" :key="index">
					<swiper-item>
						<div class="tag_box">
							<div class="tag_text" v-for="(items,indexs) in item" :key="indexs" :class="{ font_color: items.selected }">
								<div class="tag_select" @click="tagClick(index,indexs)">
									<div>
										<i class="iconfont icon-qianbi" ></i>
									</div>
									<div class="tag_title" >
										{{items.name}}
									</div>
								</div>
							</div>
						</div>
					</swiper-item>
				</block>
			</swiper>
			<div class="tag_h4" v-if="indexFlag">
				<span @click="toIndex">进入首页</span>
			</div>
			<div class="tag_h4" v-else>
				<span @click="addTags">确定</span>
			</div>
		</div>
	</div>
</template>
<script>
	import signInBtn from '../../components/signInBtn';
	import userInfo from "../../components/userInfo";
	export default {
		data () {
			return {
				imgUrls: [],
				index_a: null,
				index_b: null,
				swiper_color: '#222',
				index_arr:[],
				id:'',
				tagName:'',
				tag_ids:[],
				labelTagdata:[],
				indexFlag:true,
				tagInfo:true,
				userInfoId:"",
				userInfoSign:null,
				user_id:'',
			}
		},
		components:{
		    signInBtn
		},
		methods: {
			tagClick (index,indexs) {
				// index 为 轮播圆圈  
				// indexs 为 页面点击当前
				this.index_a = index;
				this.index_b = indexs;
				// if(this.index_arr.length>4 && !this.labelTagdata[index][indexs].selected){
				// 	wx.showToast({
				// 		title: '标签不能超过5个！',
				// 		icon: 'none',
				// 		duration:1500
				// 	})
				// }else{
					this.labelTagdata[index][indexs].selected = !this.labelTagdata[index][indexs].selected;
					if(this.labelTagdata[index][indexs].selected){
						this.index_arr.push(this.labelTagdata[index][indexs].id);
					}else{
						let temp_arr = this.index_arr;
						let del = temp_arr.indexOf(this.labelTagdata[index][indexs].id);
						temp_arr.splice(del,1);
					}
				// }
			},
			getSelelt(data,min,max){
				let that = this;
				this.index_arr = [];
				let arr = [];
				let num = parseInt(data.length/9);
				for(let i = 0; i <= num; i++){
					arr[i] = data.slice(min,max);
					if(arr[i].length == 9){
					    min+=9,max+=9;
					}
				}
				try {
			        var value = wx.getStorageSync('label_arrr');
					if (value) {
						value.forEach(function(item,index){
							arr.forEach(function(itemArr,indexArr){
								itemArr.forEach(function(arrChildItem,arrChildIndex){
									if(arrChildItem.id==item){
										arrChildItem.selected = true;
										that.index_arr.push(arrChildItem.id)
									}
								})
							})
						})
			        }
			    } catch (e) {}
				that.labelTagdata = arr
			},
			toIndex () {
				let that = this;
				try {
				  	wx.removeStorageSync('label_arr')
				} catch (e) {
				  
				}
				if(wx.getStorageSync('userData')!= null){
					let userInfo = wx.getStorageSync('userData');
					that.userInfoId = userInfo.id;
				}
				if(that.index_arr.length==0){
					wx.showToast({
						title: '请至少选择一个标签',
						icon: 'none',
						duration:1500
					})
				}else{
					this.$Http({
						url: 'tag/setUserTag',
						data:{
							user_id:that.userInfoId,
							tag_ids:that.index_arr,
							// is_index:1
						},
						callback(res){
							if (res.state == 1){
								wx.setStorage({
								  	key: "label_arr",
								  	data: that.index_arr
								})
								wx.reLaunch({
									url: '/pages/index/main'
								})
							}
						}
					})
				}
			},
			// 添加标签
			addTags(){
				let that = this;
				that.user_id =  wx.getStorageSync('userData').id;
				this.$Http({
					url: 'tag/setUserTag',
					data:{
						user_id:that.user_id,
						tag_ids:that.index_arr
					},
					callback(res){
						// wx.setStorage({
						// 	key: "label_arr",
						// 	data: []
						// })
						if (res.state == 1){
							// try {
							// 	wx.removeStorageSync('label_arr')
							// } catch (e) {}
							// wx.setStorage({
							// 	key: "label_arr",
							// 	data: that.index_arr
							// })
							// wx.redirectTo({
							// 	url:'/pages/myTags/main',
							// })
							wx.navigateBack({
							    delta: 1
							})
						}
					}
				})
			},
			tagsInfo(){
				let arr = [];
				for(let k in this.tagsList){
					arr[k] = this.tagsList[k].tag_id;
				}
				return arr;
			},
			labelTags(){
				let that = this;
				let id = this.$root.$mp.query.id;
				let userInfo =  wx.getStorageSync('userData');
				if(id==0){
					this.$Http({
						url: 'user_tag/getNewUserTag',
						data:{
							user_id:userInfo.id
						},
						callback(res){
							let data = res.data;
							// for(let k in data){
							// 	data[k].selected = false;
							// }
							if( res.state == 0 ){
								wx.showToast({
								  title: '没有新标签供您选择了!',
								  icon: 'none',
								  duration: 1000
								})
								return
							}
							that.getSelelt(data,0,9);
						
						}
				    })
				}else{
                    this.$Http({
						url: 'tag/getlist',
						data:{
							is_index:1
						},
						callback(res){
							let data = res.data;
							for(let k in data){
								data[k].selected = false;
							}
							that.getSelelt(data,0,9);
						}
					})
				}
				
			}
		},
		onLoad(){
            if(wx.getStorageSync('userData')){
				var optionidss = wx.getStorageSync("options").query.id;
				if(optionidss){
					wx.navigateTo({
					    url:'/pages/newsDetail/main?id='+optionidss
					})
				}
            }
			
			let id = this.$root.$mp.query.id;
            let tags = this.$root.$mp.query.tag;
            if(tags!=undefined){
                let arr = [];
                let temp = tags.split(',');
                temp.sort();
                for(let i in this.labelTagdata){
					for(let j in this.labelTagdata[i]){
						let temp_id = this.labelTagdata[i][j].id;
						arr[j] = temp_id;
						arr.sort();
					}
					for(let k in temp){
						if(arr[k] == temp[k]){
						    this.labelTagdata[i][k].selected = true;
						}else{
						    this.labelTagdata[i][k].selected = false;
						}
					}
          		}
			}
			
            if( id == 0){
             this.indexFlag = false;
             this.tagInfo = false;
            }
  		},
		mounted () {
			this.labelTags();
		},
	    onLaunch(options){
			console.log(gggggggg)
            console.log("[onShow] 场景值:", options.scene)
		},
		onShow(options){
			console.log('111111111')
			console.log(wx.getStorageSync("options").scene,'fff')
			console.log(wx.getStorageSync("options"),'mmmmmmm')
            if(wx.getStorageSync('userData')){
				var optionidss = wx.getStorageSync("options").query.id;
				console.log(optionidss,'这是跳转的id')
				if(optionidss){
					wx.navigateTo({
					    url:'/pages/newsDetail/main?id='+optionidss
					})
				}
            }
			console.log(9999999999)
            wx.showShareMenu();
			var that = this;
			
			if(that.$root.$mp.query.id){
				
			}else{
				if(wx.getStorageSync('userData')){
					wx.switchTab({
						url:'/pages/index/main',
						success(res){
							// console.log(res)
						},
						fail(res){
							// console.log(res)
						}
					})
				}
			}
		},
	}
</script>
<style scoped  lang="scss">
.index_wrap{
	overflow: hidden;
	height: 100%;
	width: 100%;
}
.tag_content{
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: #fff;
}
/*标题*/
.tag_h2{
	font-size: 40rpx;
	text-align: center;
	padding: 20rpx 0;
}
.tag_h4{
	font-size: 30rpx;
	text-align: center;
}
.tag_h4>span{
	display: inline-block;
	width: 190rpx;
	height: 70rpx;
	line-height: 70rpx;
	border: 1rpx solid #000;
	border-radius: 50rpx;
}
.tag_swiper{
	height: 840rpx;
	padding-bottom: 40rpx;
}
.tag_box{
	display: flex;
	flex-wrap: wrap;
	padding: 0 2%;
}
.tag_box>.tag_text{
	width: 33.3%;
	text-align: center;
	margin-bottom: 10rpx;
}
.tag_select{
	width: 100%;
	line-height: 100rpx;
	border-radius: 55%;
}
.tag_title{
	width: 100%;
	padding:20rpx 0;
	font-size: 34rpx;
}
/*图标颜色*/
.icon_color{
	background: #F9C8A6;
}
/*图标大小*/
.iconfont{
	font-size: 60rpx;
}
.font_color{
	color:#F98B2F;
}
</style>