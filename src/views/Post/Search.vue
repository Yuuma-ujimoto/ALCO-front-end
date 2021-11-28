<template>
  <div class="timeline-wrapper">
    <form action="/post/search" >
      <input type="text" >
      <button></button>
    </form>
    <Post
        v-for="(PostData) of PostResult" :key="PostData.PostId"
        :PostData="PostData"
        :PostImageArray="PostImageResult[PostData.PostId]"
        :ReplyArray="ReplyResult[PostData.PostId]"
        :FavoriteCount="FavoriteResult[PostData.PostId]"
        :MyFavoriteBool="MyFavoriteResult.indexOf(PostData.PostId)!==-1"
    ></Post>
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
      MyFavoriteResult:[]
    }
  },
  mounted() {
    this.getGlobalTimeline()
  },
  methods: {
    getGlobalTimeline: async function () {
      const url = BaseUrl + "/timeline/query?QueryText="+this.$route.params.QueryText
      const token = await this.$store.getters.getToken
      const config = {
        headers: {
          token: token
        }
      }
      const result = await axios.get(url, config)
      console.log(result)
      this.PostResult = result.data.PostResult
      this.PostImageResult = result.data.PostImageResult
      this.ReplyResult = result.data.ReplyResult
      this.FavoriteResult = result.data.FavoriteResult
      this.MyFavoriteResult = result.data.MyFavoriteResult
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
</style>