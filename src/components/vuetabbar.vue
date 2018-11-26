<template>
    <section class="tabBar-wrap">
        <article class="tabBar-box">
        <ul class="tabBar-nav" v-if="navList.length > 0">
            <li class="item" v-for="(item, index) in navList"
                @click="selectNavItem(index,item.pagePath)"
                :key="index">
            <p class="item-images">
                <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath">
            </p>
            <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
                {{item.text}}
            </p>
            </li>
            <li v-if="needButton" style="flex: 3">
            <div class="submit-box">
                <button :disabled="!handButton"
                        @click="bindNavigateTo('../order/main')"
                        :class="handButton ? 'submit-box-btn submit-box-btn-active' : 'submit-box-btn' ">
                {{ btnText }}
                </button>
            </div>
            </li>
        </ul>
        </article>
    </section>
</template>

<script>
export default {
    props: ['selectNavIndex', 'needButton', 'handButton', 'btnText'],
    data() {
        return {
            navList: [
            {
                pagePath: "../index/main",
                iconPath: "/static/images/index-default.png",
                selectedIconPath: "/static/images/index-active.png",
                text: "首页"
            },
            {
                pagePath: "../orderList/main",
                iconPath: "/static/images/order-default.png",
                selectedIconPath: "/static/images/order-active.png",
                text: "订单"
            },
            {
                pagePath: "../notice/main",
                iconPath: "/static/images/icon-notice-default.png",
                selectedIconPath: "/static/images/icon-notice-active.png",
                text: "预告"
            },
            {
                pagePath: "../user/main",
                iconPath: "/static/images/person-default.png",
                selectedIconPath: "/static/images/person-active.png",
                text: "个人"
            }
            ],
        }
    },
    methods: {
      /**
       * 点击导航栏
       * @param index
       */
        selectNavItem(index, pagePath) {
            console.log(this.selectNavIndex)

            if (index === this.selectNavIndex) {
                return false;
            }


            if (index == 0 && this.selectNavIndex == -1) {
               this.$emit("fetch-index");
            }
            this.bindViewTap(pagePath);
        },

        /**
         * 路由跳转
         */
        bindNavigateTo(url) {
            wx.navigateTo({
               url
            })
        },

        /**
         * tabBar路由跳转
         */
        bindViewTap(url) {
            // 回到顶部
            if (url === '../index/main') {
                store.commit('setGroupsID', '');
            }
            wx.switchTab({
                url,
            })
        },
    }
}
</script>

<style lang="less" scoped>
  .tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    padding: 20px 0;
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
  }

  .tabBar-nav {
    width: 100%;
    display: flex;

    .item {
      flex: 1;
      text-align: center;
    }
    .item-text {
      color: #666;
      font-size: 28px;
      transition: .24s linear;
    }
    .item-text-active {
      color: #27a79a;
    }

    .item-images {
      width: 48px;
      height: 48px;
      margin: 0 auto;
      text-align: center;
      transition: .24s linear;

      & img {
        display: inline;
        width: 100%;
        height: 100%;
      }
    }
  }

  .submit-box-btn {
    position: relative;
    z-index: 999;
    width: 85%;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    color: #404040;
    font-size: 36px;
    border: none;
    background-color: #eee;
    text-align: center;
    border: 1px solid #eee;
  }

  .submit-box-btn-active {
    color: #fff;
    border: none;
    border: 1px solid #ff6c00;
    background-color: #ff6c00;
  }

  button {
    border: none;
    outline: none;
  }
</style>


