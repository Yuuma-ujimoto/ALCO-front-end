<template>
  <header>
    <div class="header-left-area">
      <router-link to="/">
        <img src="../assets/Logo.svg" alt="Alco">
      </router-link>
    </div>

    <div class="header-right-area">
      <div class="link-area">

        <div class="link-wrapper">
          <div class="main-link">
            <img src="../assets/cocktail.svg" alt="" class="icon">
            <router-link to="/post/timeline" class="header-link">Post</router-link>
          </div>
          <div class="sub-link">
            <img src="../assets/edit_black_24dp.svg" alt="" class="icon">
            <router-link to="/post/form" class="header-link">Form</router-link>
          </div>
        </div>

        <div class="link-wrapper">
          <div class="main-link">
            <img src="../assets/article_black_24dp.svg" alt="" class="icon">
            <router-link to="/article/all" class="header-link">Article</router-link>
          </div>
          <div class="sub-link">
            <img src="../assets/edit_black_24dp.svg" alt="" class="icon">
            <router-link to="/article/form" class="header-link">Form</router-link>
          </div>
          <div class="sub-link">
            <img src="../assets/search.svg" alt="" class="icon">
            <router-link to="/article/search" class="header-link">Search</router-link>
          </div>
        </div>


      </div>
      <div class="user-area"
      >
        <div class="user-area-link sign-up-area">
          <router-link to="/SignUp" class="user-link">Sign Up</router-link>
        </div>
        <div class="user-area-link sign-in-area">
          <router-link to="/SignIn" class="user-link">Sign In</router-link>
        </div>
      </div>
      <div class="notice-area">
        <div class="notice" v-if="this.$store.getters.isLogin">
          <p>{{NoticeCount}}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import {BaseUrl} from "../assets/BaseUrl";
export default {
  name: "globalHeader",
  data(){
    return{
      NoticeCount:0
    }
  },
  watch:{
  $route:async function () {
    console.log("router change")
    if (this.$store.getters.isLogin) {
      const NoticeCountURL = BaseUrl + "/notice/count"
      const token = await this.$store.getters.getToken
      const config = {
        headers: {
          token
        }
      }
      const NoticeCountResult = await axios.get(NoticeCountURL, config)
      console.log(NoticeCountResult)
      this.NoticeCount = NoticeCountResult.data.NoticeCount
    }
  }
}
}
</script>

<style scoped>

.icon{
  width: 20px;
  height: 20px;
  margin-right:  4px;
  margin-bottom: 5px;
}

header {
  width: 100%;
  height: 70px;
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  background: #ffffff;
  box-sizing: border-box;
  border-bottom: solid 1px #222222;
  z-index: 10000;
}

.header-left-area {
  width: 20%;
  background: #fff;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  box-sizing: border-box;
}

.header-right-area {
  width: 80%;
  height: 100%;
  display: flex;

}

.link-area {
  width: 65%;
  height: 100%;
  display: flex;
}

.main-link {
  width: 200px;
  margin: 0;
  display: flex;
  height: 70px;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  border-bottom: solid 1px #222;
  box-sizing: border-box;
  padding-left: 40px;

}

.sub-link {
  display: flex;
  width: 200px;
  height: 70px;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  box-sizing: border-box;
  border: solid 1px #222;
  border-top:none ;
  padding-left: 40px;
  visibility: visible;
  opacity: 0;
  position: absolute;
}

.header-link{
  font-size: 22px;
  color: #222222;
}

.link-wrapper:hover > .sub-link {
  transition: .4s;
  opacity: 1;
  position: relative;
  top: 0;

}


.user-area {
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user-area-link {
  width: 100px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.user-link{
  font-size: 18px;
  text-decoration: none;
  color: #222;

}

.sign-in-area {
  background: powderblue;
}

.sign-up-area {
  background: gold;
}
</style>