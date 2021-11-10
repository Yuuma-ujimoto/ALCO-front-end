<template>
  <div class="notice-wrpper">

  </div>
</template>

<script>
import {BaseUrl} from "../assets/BaseUrl";
import axios from "axios";

export default {
  name: "Notice",
  data(){
    return{
      NoticeResult : []
    }
  },
  mounted:async function () {
    const url = BaseUrl + "/notice/show"
    const token = this.$store.getters.getToken
    const params = {
      headers:{
        token:token
      }
    }
    const result = await axios.get(url,params)
    console.log(result)
  }
}
</script>

<style scoped>

</style>