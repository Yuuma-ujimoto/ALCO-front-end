<template>
  <div class="">

  </div>
</template>

<script>
import axios from "axios";
import {BaseUrl} from "../../assets/BaseUrl";

export default {
  name: "TimeLine",
  mounted() {
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
      console.log(result)
    }
  }
}
</script>

<style scoped>

</style>