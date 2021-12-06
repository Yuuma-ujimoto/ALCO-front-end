<template>
  <div class="timeline-wrapper">
    <div class="search-area">
      <input type="text" class="search-input" placeholder="search word" v-model="QueryText">
      <button class="search-button" @click="searchText">検索</button>
    </div>

    <Post v-for="(result,index) in PostResult" :key="index" :PostData="result"/>


  </div>
</template>

<script>
import axios from "axios";
import {BaseUrl} from "../../assets/BaseUrl";
import Post from "../../components/Post/Post";

export default {
  name: "TimeLine",

  components: {
    Post
  },
  data() {
    return {
      PostResult: [],
      PostImageResult: [],
      ReplyResult: [],
      FavoriteResult: [],
      MyFavoriteResult: [],
      QueryText: null
    }
  },
  watch: {
    $route() {
      console.log("search")
    }
  },
  created() {
    console.log("created")
  },
  mounted() {
    //this.getGlobalTimeline()
    console.log("mounted")
    window.onload= ()=>{
      console.log("load")
      this.checkQuery()

    }
  },

  methods: {
    checkQuery(){
      console.log(this.$route.params.QueryText)
      if (!this.$route.params.QueryText) {
        return
      }
      this.getQueryPosts()

    },
    searchText() {
      if (!this.QueryText) {
        //alert:警告処理
        return
      }
      this.$router.push("/post/search/" + this.QueryText)
    },
    getQueryPosts: async function () {
      const url = BaseUrl + "/timeline/query?QueryText=" + this.$route.params.QueryText
      const token = await this.$store.getters.getToken
      const config = {
        headers: {
          token: token
        }
      }
      const result = await axios.get(url, config)
      console.log("****************")
      console.log(result)
      this.PostResult = result.data.ResultArray
    }
  }
}
</script>

<style scoped>
.timeline-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.icon {
  width: 48px;
}

.search-area {
  display: flex;
  width: 50%;
}

.search-input {
  width: 75%;
  height: 50px;
  margin: 0;
  padding-left: 10px;
  outline: none;
  box-sizing: border-box;
  border: solid 1px black;
  font-size: 24px;
}

.search-button {
  height: 50px;
  width: 25%;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  border: solid 1px black;

}


</style>