<template>
  <div>
    <form @submit.prevent="Submit">
      <dl>
        <dt>
          <label for="MailAddress">メールアドレス</label>
        </dt>
        <dd>
          <input id="MailAddress" type="email" v-model="PostParams.MailAddress">
        </dd>
        <dt>
          <label for="Password">パスワード</label>
        </dt>
        <dd>
          <input id="Password" type="password" v-model="PostParams.Password">
        </dd>
        <dd>
          <button type="submit">Submit</button>
        </dd>
      </dl>
    </form>
  </div>
</template>

<script>
import {BaseUrl} from "../../assets/BaseUrl";
import axios from "axios";

export default {
  name: "SignInUp",
  data() {
    return {
      PostParams: {
        MailAddress: "",
        Password: "",
      },
    }
  },
  methods: {
    Submit:async function() {
      const url = BaseUrl+"/user/SignIn"
      const PostParams = new URLSearchParams()
      for (let Param in this.PostParams) {
        PostParams.append(Param.toString(), this.PostParams[Param])
      }
      const result = await axios.post(url,PostParams)
      console.log(result)
      if (result.data.ServerError){
        console.log(result.data.ServerError)
        return
      }
      if (result.data.ClientError){
        console.log(result.data.ClientError)
        return
      }
      await this.$store.dispatch("login",result.data.Token)
      await this.$router.push({path:"/"})
    }
  }
}
</script>

<style scoped>

</style>