<template>
  <div class="pocket_audio">
    <!-- :current="index" -->
    <div v-for="(item,index) in audio_data" :key="index">
      <a :href="'/pages/newsDetail/main?id='+item.id">
        <div class="weui_artical">
          <div class="weui_articlebox">
            <div class="weui_artical_titleleft">
              <img :src="http_url+item.au_avatar" alt="" class="weui_artical_img">
              <span class="weui_artical_name">{{item.au_name}}</span>
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
    <!-- <div class="has-more">
        <div v-if="!hasMore" class="comment_ft">点赞</div>
				<div v-else class="comment_ft icon_green">已点赞</div>
    </div> -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        http_url:'https://wenzhai.ichangbanmini.com',
      }
    },
    props:['audio_data'],
    onLoad () {
      // this.audioIndex_obj = audio_data[audio_index].id;
    },
    computed:{
      
    },
    methods: {
      
    },
    mounted () {
    
    },
  }
</script>
<style scoped>
.pocket_audio div{
  background:#fff;
}
.has-more {
    padding-bottom: 15rpx;
}

.has-more div {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    justify-content: center;
}

.has-more span {
    color: #999;
    font-size: 32rpx;
}
</style>