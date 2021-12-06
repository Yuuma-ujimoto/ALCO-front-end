<template>
  <div class="timeline-wrapper">
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
      PostResult: []
    }
  },
  // DOMが生成される前に読み込んで反映
  created() {
    this.getGlobalTimeline()
  },
  methods: {
    getGlobalTimeline: async function () {
      const url = BaseUrl + "/timeline/global"
      const token = await this.$store.getters.getToken
      const config = {
        headers: {
          token: token
        }
      }
      const result = await axios.get(url, config)
      const ResultData = result.data
      console.log(ResultData)
      this.PostResult = ResultData.ResultArray
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