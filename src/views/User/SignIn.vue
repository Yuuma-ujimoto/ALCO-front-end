<template>
  <div class="form-wrapper">
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
      const ResultData = result.data
      console.log(result)
      if (ResultData.ServerError){
        console.log(result.data.ServerError)
        return
      }
      if (ResultData.ClientError){
        console.log(result.data.ClientError)
        return
      }

      const UserData = {
        Token:ResultData.Token,
        AccountName:ResultData.AccountName,
        DisplayName:ResultData.DisplayName
      }

      await this.$store.dispatch("login",UserData)
      await this.$router.push({path:"/"})
    }
  }
}
</script>

<style scoped>

.form-wrapper{
  display: flex;
  width: 80%;
  margin:0 auto;
  justify-content: center;
}

input{
  width: 400px;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: solid 1px #222;
}
dd,dt{
  margin-bottom: 15px;
}
input:focus{
  outline: none;
}
input:-webkit-autofill{
  background-color: #fff;
}


</style>