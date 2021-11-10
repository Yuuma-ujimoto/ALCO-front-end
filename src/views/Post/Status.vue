<template>
  <div v-if="AxiosEnd">
    <Post
        :PostData="PostStatusResult"
        :PostImageArray="PostImageResult"
        :ReplyArray="ReplyResult"
        :FavoriteCount="FavoriteCount"
        :MyFavoriteBool="MyFavoriteBool"
    ></Post>
  </div>
</template>

<script>
import {BaseUrl} from "../../assets/BaseUrl";
import axios from "axios";
import Post from "../../components/Post/Post";
export default {
  name: "Status",
  components:{
    Post
  },
  data(){
    return{
      AxiosEnd:false,
      PostStatusResult:null,
      PostImageResult:null,
      ReplyResult:null,
      FavoriteCount:null,
      MyFavoriteBool:null
    }
  },
  mounted:async function() {
    const url = BaseUrl+"/timeline/status?PostId="+this.$route.params.PostId
    const token = this.$store.getters.getToken
    const config = {
      headers:{
        token:token
      }
    }
    const result = await axios.get(url,config)
    console.log(result)
    const Rd = result.data
    console.log(Rd.PostImageResult)
    this.MyFavoriteBool = Rd.IsMyFavorite
    this.FavoriteCount = Rd.FavoriteCount
    this.PostStatusResult = Rd.PostStatusResult
    this.ReplyResult = Rd.ReplyResult
    this.PostImageResult = Rd.PostImageResult
    this.AxiosEnd = true
  }
}
</script>

<style scoped>

</style>