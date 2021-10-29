<template>
  <div class="form-wrapper">
    <form @submit.prevent="Submit">
      <dl>
        <dt>
          <label for="AccountName">アカウント名</label>
        </dt>
        <dd>
          <input id="AccountName" type="text" v-model="PostParams.AccountName">
        </dd>
        <dt>
          <label for="DisplayName">表示名</label>
        </dt>
        <dd>
          <input id="DisplayName" type="text" v-model="PostParams.DisplayName">
        </dd>
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
        <dt>
          <label for="ConfirmPassword">パスワード(確認用)</label>
        </dt>
        <dd>
          <input id="ConfirmPassword" type="password" v-model="PostParams.ConfirmPassword">
        </dd>
        <dt>
          生年月日
        </dt>
        <dd class="birthday-wrapper">
          <select class="birthday-input"  v-model="PostParams.BirthdateYear">
            <option v-for="(year,index) of yearArray" :key="index"
                    :value="year"
                    :selected="index===0"
            >
              {{ year }}年
            </option>
          </select>

          <select class="birthday-input" v-model="PostParams.BirthdateMonth">
            <option value="1" selected>1月</option>
            <option value="2">2月</option>
            <option value="3">3月</option>
            <option value="4">4月</option>
            <option value="5">5月</option>
            <option value="6">6月</option>
            <option value="7">7月</option>
            <option value="8">8月</option>
            <option value="9">9月</option>
            <option value="10">10月</option>
            <option value="11">11月</option>
            <option value="12">12月</option>
          </select>

          <select class="birthday-input" v-model="PostParams.BirthdateDate">
            <option v-for="index in dateArray" :key="index"
                    :value="index"
            >{{ index }}日
            </option>
          </select>
        </dd>

        <dd>
          <button type="submit">Submit</button>
        </dd>
      </dl>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import {BaseUrl} from "../../assets/BaseUrl";
export default {
  name: "SignInUp",
  data() {
    return {
      PostParams: {
        AccountName: "",
        DisplayName: "",
        MailAddress: "",
        Password: "",
        ConfirmPassword: "",
        BirthdateYear: 2001,
        BirthdateMonth: 1,
        BirthdateDate: 1
      },
    }
  },
  computed: {
    dateArray: () => {
      // 後でMonthの
      return Array.from(Array(31).keys(), x => x + 1)
    },
    yearArray: () => {
      let result = []
      const Year = new Date().getFullYear()
      for (let i = 20; i < 120; i++) {
        result.push(Year - i)
      }
      return result
    }
  },
  methods: {
    Submit: async function () {
      const url = BaseUrl+"/user/SignUp"
      console.log(this.PostParams)
      const PostParams = new URLSearchParams()
      for (let Param in this.PostParams) {
        console.log(Param, this.PostParams[Param])
        PostParams.append(Param.toString(), this.PostParams[Param])
      }

      const result = await axios.post(url, PostParams)
      console.log(result)
      const ResultData = result.data
      if (ResultData.ServerError){
        console.log(ResultData.Message)
        await this.$store.dispatch("")
        return
      }
      if (ResultData.ClientError){
        console.log(ResultData.Message)
        return
      }
      console.log(ResultData.Token)
      await this.$store.dispatch("login", ResultData.Token)
      await this.$router.push({path: "/"})
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

  .birthday-wrapper{
    display: flex;
    justify-content: space-between;
  }

  select{
    width: 120px;
    height: 40px;
    font-size: 16px;
  }
</style>